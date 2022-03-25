import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Client } from '@app/core/interfaces/client';
import { Staff } from '@app/core/interfaces/staff';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { AutocompleteSelectedEvent } from '@app/shared/autocomplete/autocomplete.component';
import { Conversation } from '@twilio/conversations';
import { from, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-conversation-draft',
  templateUrl: './conversation-draft.component.html',
  styleUrls: ['./conversation-draft.component.scss'],
})
export class ConversationDraftComponent implements OnInit, OnDestroy {
  @Output() conversationFound: EventEmitter<Conversation> = new EventEmitter<Conversation>();

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
    } else {
      this.participantType = 'chat';
    }
    const existingConversation = await this.findDirectConversation();
    if (existingConversation) {
      this.conversationFound.emit(existingConversation);
    }
  }

  resetFilteredOptions() {
    this.filteredStaffMembers = [...this.staffMembers];
    this.filteredClients = [...this.clients];
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
            if (this.participantType === 'sms') {
              this._conversationService
                .addParticipant(conversation, {
                  identity: conversation.createdBy,
                  messagingBinding: { projectedAddress: '+12142514119' },
                  attributes: { friendlyName: user.friendlyName },
                })
                .subscribe();
            } else {
              this._conversationService
                .addParticipant(conversation, {
                  identity: conversation.createdBy,
                  attributes: { friendlyName: user.friendlyName },
                })
                .subscribe();
            }
          });
        }),
        // Add selected participant.
        switchMap((conversation) => {
          if (this.participantType === 'sms') {
            return this._conversationService
              .addParticipant(conversation, {
                messagingBinding: { address: this.selectedParticipant.phone },
                attributes: {
                  friendlyName: this.selectedParticipant.full_name,
                },
              })
              .pipe(map(() => conversation));
          }
          return this._conversationService
            .addParticipant(conversation, {
              identity: this.selectedParticipant.id,
              attributes: { friendlyName: this.selectedParticipant.full_name },
            })
            .pipe(map(() => conversation));
        }),
      )
      .subscribe((conversation) => {
        this._conversationService.sendMessage(conversation, this.messageBody).subscribe(() => {
          this.conversationFound.emit(conversation);
        });
      });
  }

  async findDirectConversation() {
    const currentUserIdentity = this._conversationService.user.identity;

    const result = await this.asyncFind(
      this._conversationService.conversations$.value,
      async (conversation) => {
        const attributes = conversation.attributes;

        const participants = await conversation.getParticipants();
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
