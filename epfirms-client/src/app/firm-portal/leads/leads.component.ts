import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { LegalArea } from '@app/core/interfaces/legal-area';
import { Matter } from '@app/core/interfaces/matter';
import { Staff } from '@app/core/interfaces/staff';
import { from, Observable } from 'rxjs';
import { map, mergeMap, switchMap, take } from 'rxjs/operators';
import { AddCaseComponent } from '../overlays/add-case/add-case.component';
import { LegalAreaService } from '../_services/legal-area-service/legal-area.service';
import { MatterService } from '../_services/matter-service/matter.service';
import { MatterTabsService } from '../../features/matter-tab/services/matter-tabs-service/matter-tabs.service';
import { StaffService } from '../_services/staff-service/staff.service';
import { AutocompleteSelectedEvent } from '@app/shared/autocomplete/autocomplete.component';
import { EpModalService } from '@app/shared/modal/modal.service';
import { ConversationService } from '@app/features/conversation/services/conversation.service';
import { Store } from '@ngrx/store';
import { FirmService } from '../_services/firm-service/firm.service';
import { TeamService } from '@app/features/team/services/team.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
  host: {
    class: 'flex-1 relative z-0 flex flex-col overflow-hidden',
  },
  animations: [
    trigger('toggleAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
    ]),
  ],
})
export class LeadsComponent implements OnInit {
  displayedColumns = ['client', 'task', 'legal-area', 'attorney', 'status'];

  attorneys$: Observable<Staff[]>;

  attorneys: Staff[] = [];

  filteredAttorneys: Staff[] = [];

  leads$: Observable<Matter[]>;

  legalAreas$: Observable<LegalArea[]>;

  statusFilterOptions: any[] = ['active', 'inactive'];

  paginator: { start: number; end: number } = { start: 0, end: 20 };

  searchTerm: string = '';

  statusOptions: any[] = [
    {
      name: 'active case',
      status: 'active',
      matter_type: 'case',
    },
    {
      name: 'inactive case',
      status: 'inactive',
      matter_type: 'case',
    },
    {
      name: 'active lead',
      status: 'active',
      matter_type: 'lead',
    },
    {
      name: 'inactive lead',
      status: 'inactive',
      matter_type: 'lead',
    },
    {
      name: 'completed case',
      status: 'complete',
      matter_type: 'case',
    },
  ];

  matterFilterValues = {
    matter_type: 'lead',
    status: 'active',
    searchTerm: '',
    attorney_id: null,
  };

  sortValues: { column: string; direction: string } = {
    column: null,
    direction: null,
  };

  constructor(
    private _matterService: MatterService,
    private _matterTabsService: MatterTabsService,
    private _legalAreaService: LegalAreaService,
    private _staffService: StaffService,
    private _modalService: EpModalService,
    private _conversationService: ConversationService,
    private _firmService: FirmService,
    private readonly store: Store,
    private _teamService: TeamService,
  ) {
    this.legalAreas$ = _legalAreaService.entities$;
    this.leads$ = _matterService.filteredEntities$;
    this.attorneys$ = _staffService.filteredEntities$;
  }

  ngOnInit(): void {
    this.filter();
    this._staffService.setFilter({ active: true, role: ['attorney'] });
    this.attorneys$.pipe(take(1)).subscribe((a) => {
      this.attorneys = [...a];
      this.filteredAttorneys = [...a];
    });
  }

  displayFn(value, options): string {
    const selectedAttorney = options.find((option) => option.value === value);
    return selectedAttorney ? selectedAttorney.viewValue : 'Select an attorney';
  }

  filterAttorneys(event) {
    this.filteredAttorneys =
      event && event.length
        ? this.attorneys.filter((attorney) =>
            attorney.user.full_name.toLowerCase().includes(event.toLowerCase()),
          )
        : [...this.attorneys];
  }

  openTab(matter: Matter) {
    this._matterTabsService.add(matter.id);
  }

  addLead() {
    const addCaseModal = this._modalService.create({
      epContent: AddCaseComponent,
      epModalType: 'slideOver',
      epComponentParams: {
        matterType: 'lead',
      },
      epAutofocus: null,
    });

    addCaseModal.afterClose.subscribe((data) => {
      if (data && data.matter) {
        this._matterService.create(data.matter).subscribe((response) => {
          response.pipe(take(1)).subscribe((newMatter) => {
            if (data.note && data.note.length && newMatter.id) {
              if (data.note && data.note.length) {
                this.addNote(newMatter.id, data.note);
              }
            }

            if (data.chatToTextNumber) {
              this.createConversation(newMatter);
            }
          });
        });
      }
    });
  }

  createConversation(matter) {
    this._teamService
      .getAllByUserId(matter.attorney_id)
      .pipe(
        switchMap((teams) =>
          this._teamService
            .getAllMembers(teams[0].id)
            .pipe(map((response) => ({ teams, members: response.data.filter(m => m.include_in_group_chat) }))),
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

  setAttorney(matter: Matter, event: AutocompleteSelectedEvent) {
    const selectedOptionValue = event.option.value;
    this._matterService.update({ id: matter.id, attorney_id: selectedOptionValue }).subscribe();
    this.filteredAttorneys = [...this.attorneys];
  }

  addNote(id: number, note) {
    this._matterService.addMatterNote(id, note).subscribe();
  }

  setLegalArea(matter: Matter, legalArea: LegalArea) {
    this._matterService.update({ id: matter.id, legal_area_id: legalArea.id }).subscribe();
  }

  // TODO: Rewrite this abomination to be generic
  sortMatters(column: string) {
    // Toggle asc -> desc -> null
    if (!this.sortValues.direction) {
      this.sortValues.column = column;
      this.sortValues.direction = 'asc';
    } else if (this.sortValues.direction === 'asc') {
      this.sortValues.direction = 'desc';
    } else {
      this.sortValues.column = null;
      this.sortValues.direction = null;
    }

    if (this.sortValues.column && this.sortValues.direction) {
      if (this.sortValues.column === 'first_name') {
        this.leads$ = this._matterService.filteredEntities$.pipe(
          map((matters) => {
            return matters.sort(this.sortByFirstName(this.sortValues.direction));
          }),
        );
      } else if (this.sortValues.column === 'task') {
        this.leads$ = this._matterService.filteredEntities$.pipe(
          map((matters) => {
            return matters.sort(this.sortByTaskDate(this.sortValues.direction));
          }),
        );
      }
    } else {
      this.filter();
      this.leads$ = this._matterService.filteredEntities$;
    }
    console.log(this.sortValues.direction);
  }

  sortByFirstName(direction: string) {
    return (a, b) => {
      if (direction === 'asc') {
        return a.client.first_name.localeCompare(b.client.first_name);
      } else if (direction === 'desc') {
        return b.client.first_name.localeCompare(a.client.first_name);
      }
    };
  }

  sortByTaskDate(direction: string) {
    return (a, b) => {
      if (direction === 'asc') {
        if (a.matter_tasks.length && !b.matter_tasks.length) {
          return -1;
        } else if (!a.matter_tasks.length && b.matter_tasks.length) {
          return 1;
        } else if (!a.matter_tasks.length && !b.matter_tasks.length) {
          return 0;
        } else {
          if (a.matter_tasks[0].completed && !b.matter_tasks[0].completed) {
            return 1;
          } else if (!a.matter_tasks[0].completed && b.matter_tasks[0].completed) {
            return -1;
          } else if (!a.matter_tasks[0].completed && b.matter_tasks[0].completed) {
            return 0;
          } else {
            return (
              new Date(a.matter_tasks[0].due).getTime() - new Date(b.matter_tasks[0].due).getTime()
            );
          }
        }
      } else {
        if (a.matter_tasks.length && !b.matter_tasks.length) {
          return 1;
        } else if (!a.matter_tasks.length && b.matter_tasks.length) {
          return -1;
        } else if (!a.matter_tasks.length && !b.matter_tasks.length) {
          return 0;
        } else {
          if (a.matter_tasks[0].completed && !b.matter_tasks[0].completed) {
            return -1;
          } else if (!a.matter_tasks[0].completed && b.matter_tasks[0].completed) {
            return 1;
          } else if (!a.matter_tasks[0].completed && b.matter_tasks[0].completed) {
            return 0;
          } else {
            return (
              new Date(a.matter_tasks[0].due).getTime() - new Date(b.matter_tasks[0].due).getTime()
            );
          }
        }
      }
    };
  }

  setStatus(matter: Matter, status) {
    this._matterService.update({ id: matter.id, ...status }).subscribe();
  }

  setPagination(current: { start: number; end: number }) {
    this.paginator = current;
  }

  filterStatus(value: string) {
    this.matterFilterValues.status = value;
    this.filter();
  }

  filterAttorney(id: number) {
    if (this.matterFilterValues.attorney_id != id) {
      this.matterFilterValues.attorney_id = id;
    } else {
      this.matterFilterValues.attorney_id = null;
    }

    this.filter();
  }

  filter() {
    const filterValues = Object.assign({}, this.matterFilterValues);
    this._matterService.setFilter(filterValues);
  }

  trackByIndex(index, item) {
    return item.id;
  }
}
