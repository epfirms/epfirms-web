import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '@app/core/interfaces/client';
import { Staff } from '@app/core/interfaces/staff';
import { TeamService } from '@app/features/team/services/team.service';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { FirmService } from '@app/firm-portal/_services/firm-service/firm.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { AutocompleteSelectedEvent } from '@app/shared/autocomplete/autocomplete.component';
import { EpModalService } from '@app/shared/modal/modal.service';
import { Store } from '@ngrx/store';
import { Conversation } from '@twilio/conversations';
import { from, map, mergeMap, Observable, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { ConversationMatterSelectModalComponent } from '../conversation-matter-select-modal/conversation-matter-select-modal.component';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-conversation-draft',
  templateUrl: './conversation-draft.component.html',
  styleUrls: ['./conversation-draft.component.scss'],
})
export class ConversationDraftComponent implements OnInit, OnDestroy {
  searchInput: string;

  staffMembers: Staff[] = [];

  filteredStaffMembers: Staff[] = [];

  staff$: Observable<Staff[]>;

  clients$: Observable<Client[]>;

  selectedParticipant: any;

  participantType: 'sms' | 'chat';

  messageBody: string;

  clients: Client[] = [];

  filteredClients: Client[] = [];

  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _staffService: StaffService,
    private _conversationService: ConversationService,
    private _clientService: ClientService,
    private readonly store: Store,
    private _teamService: TeamService,
    private _modalService: EpModalService,
    private _firmService: FirmService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.staff$ = this._staffService.entities$;
    this.clients$ = this._clientService.entities$;
  }

  ngOnInit(): void {
    this.staff$.pipe(takeUntil(this.destroy$)).subscribe((a) => {
      this.staffMembers = [
        ...a.filter(
          (member) => member.user.id.toString() !== this._conversationService.user.identity,
        ),
      ];
      this.filteredStaffMembers = [...this.staffMembers];
    });

    this.clients$.pipe(takeUntil(this.destroy$)).subscribe((c) => {
      this.clients = c;
      this.filteredClients = c;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterOptions(event) {
    this.filteredClients =
      event && event.length
        ? this.clients.filter((client) =>
            client.full_name.toLowerCase().includes(event.toLowerCase()),
          )
        : [...this.clients];

    this.filteredStaffMembers =
      event && event.length
        ? this.staffMembers.filter((attorney) =>
            attorney.user.full_name.toLowerCase().includes(event.toLowerCase()),
          )
        : [...this.staffMembers];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  displayFn(value, options): string {
    return value && value.full_name;
  }

  async handleOptionSelected(event: AutocompleteSelectedEvent) {
    const option = event.option;
    const optionGroup = option.group.label;
    this.selectedParticipant = option.value;

    this.resetFilteredOptions();

    if (optionGroup === 'Clients') {
      this.participantType = 'sms';
      this.openMatterSelectModal(this.selectedParticipant.id);
    } else {
      this.participantType = 'chat';
      const existingConversation = await this.findDirectConversation(this.participantType);
      if (existingConversation) {
        this.navigateToConversation(existingConversation);
      }
    }
  }

  openMatterSelectModal(clientUserId: number) {
    this._modalService.create({
      epContent: ConversationMatterSelectModalComponent,
      epOkText: 'Confirm',
      epCancelText: 'Cancel',
      epAutofocus: null,
      epMaxWidth: '36rem',
      epComponentParams: {
        clientUserId
      },
      epOkDisabled: true,
      epOnOk: (componentInstance) => {
        this.findDirectConversation(this.participantType).then((conversation) => {
          if (conversation) {
            this.navigateToConversation(conversation);
          } else {
            this.createGroupConversation(componentInstance.selectedMatter);
          }
        });
      }
    });  }

  resetFilteredOptions() {
    this.filteredStaffMembers = [...this.staffMembers];
    this.filteredClients = [...this.clients];
  }

  createGroupConversation(matter) {
    this._teamService
      .getAllByUserId(matter.attorney_id)
      .pipe(
        switchMap((teams) =>
          this._teamService
            .getAllMembers(teams[0].id)
            .pipe(map((response) => ({ teams, members: response.data }))),
        ),
      )
      .subscribe(({ teams, members }) => {
        this._conversationService
          .createConversation('group', { matterId: matter.id })
          .pipe(
            mergeMap((conversation) =>
              this._conversationService
                .addParticipant(conversation, {
                  messagingBinding: { address: matter.client.cell_phone },
                  attributes: {
                    friendlyName: matter.client.full_name,
                    phone: matter.client.cell_phone,
                  },
                })
                .pipe(map(() => conversation)),
            ),
            mergeMap((conversation) =>
              from(members).pipe(
                mergeMap((member: any) =>
                  this._conversationService.addParticipant(conversation, {
                    identity: member.firm_employee.user_id,
                    messagingBinding: { projectedAddress: teams[0].twilio_phone_number },
                    attributes: {
                      friendlyName:
                        member.firm_employee.user.first_name +
                        ' ' +
                        member.firm_employee.user.last_name,
                    },
                  }),
                ),
              ).pipe(map(() => conversation)),
            ),
            take(1)
          )
          // Add selected participant.
          .subscribe((conversation) => {
            this._firmService.getCurrentFirm().subscribe((firm) => {
              const message = `Hello, this is your attorney, ${matter.attorney.full_name}, at ${firm.name}. I would like to communicate with you through text. If you do not want me to text you, please reply STOP.`;
              this._conversationService
                .sendMessage(conversation.sid, { body: message, author: matter.attorney_id })
                .subscribe(() => {});
            });
          });
      });
  }

  navigateToConversation(conversation: Conversation) {
    this._router.navigate(['..', `${conversation.sid}`], { relativeTo: this._route });
  }

  createConversation(): void {
    this._conversationService
      .createConversation()
      .pipe(
        // Add logged in user as participant.
        tap((conversation) => {
          from(
            this._conversationService.conversationsClient.getUser(conversation.createdBy),
          ).subscribe((user) => {
              this._conversationService
                .addParticipant(conversation, {
                  identity: conversation.createdBy,
                  attributes: { friendlyName: user.friendlyName },
                })
                .subscribe();
          });
        }),
        // Add selected participant.
        switchMap((conversation) => {
          return this._conversationService
            .addParticipant(conversation, {
              identity: this.selectedParticipant.id,
              attributes: { friendlyName: this.selectedParticipant.full_name },
            })
            .pipe(map(() => conversation));
        }),
      )
      .subscribe((conversation) => {
        from(conversation.sendMessage(this.messageBody)).subscribe(() => {
          this.navigateToConversation(conversation);
        });
      });
  }

  async findDirectConversation(type: 'chat' | 'sms') {
    const currentUserIdentity = this._conversationService.user.identity;

    const result = await this.asyncFind(
      this._conversationService.conversations$.value,
      async (conversation) => {
        const attributes = conversation.attributes;

        const participants = await conversation.getParticipants();
        if (type === 'sms') {
          return (
            participants.length > 1 &&
            participants.some((p) => p.attributes.phone === this.selectedParticipant.cell_phone)
          )
        }
        return (
          currentUserIdentity !== this.selectedParticipant.id.toString() &&
          attributes.type === 'direct' &&
          participants.length > 1 &&
          participants.some((p) => p.identity === currentUserIdentity) &&
          participants.some((p) => p.identity === this.selectedParticipant.id.toString())
        );
      },
    );

    return result;
  }

  async asyncFind(arr, callback) {
    const fail = Symbol();
    return (
      await Promise.all(arr.map(async (item) => ((await callback(item)) ? item : fail)))
    ).find((i) => i !== fail);
  }
}
