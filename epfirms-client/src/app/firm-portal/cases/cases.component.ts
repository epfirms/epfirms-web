import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { LegalArea } from '@app/core/interfaces/legal-area';
import { Matter } from '@app/core/interfaces/matter';
import { Observable } from 'rxjs';
import { AddCaseComponent } from '../overlays/add-case/add-case.component';
import { LegalAreaService } from '../_services/legal-area-service/legal-area.service';
import { MatterService } from '../_services/matter-service/matter.service';
import { MatterTabsService } from '../../features/matter-tab/services/matter-tabs-service/matter-tabs.service';
import { map, take } from 'rxjs/operators';
import { Staff } from '@app/core/interfaces/staff';
import { StaffService } from '../_services/staff-service/staff.service';
import { AutocompleteSelectedEvent } from '@app/shared/autocomplete/autocomplete.component';
import { EpModalService } from '@app/shared/modal/modal.service';
import { ConversationService } from '@app/features/conversation/services/conversation.service';
import { FirmService } from '../_services/firm-service/firm.service';
import { IntakeService } from '@app/features/intake-v2/services/intake.service';
import { emailService } from '@app/shared/_services/email-service/email.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss'],
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
export class CasesComponent implements OnInit {
  displayedColumns = ['client', 'task', 'legal-area', 'attorney', 'billing', 'status'];

  attorneys$: Observable<Staff[]>;

  cases$: Observable<Matter[]>;

  legalAreas$: Observable<LegalArea[]>;

  statusFilterOptions: any[] = ['active', 'inactive', 'complete'];

  attorneys: Staff[] = [];

  filteredAttorneys: Staff[] = [];

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

  paginator: { start: number; end: number } = { start: 0, end: 20 };

  searchTerm: string = '';

  matterFilterValues = {
    matter_type: 'case',
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
    private _intakeService: IntakeService,
    private _emailService: emailService,
    private _toastService: HotToastService,
  ) {
    this.legalAreas$ = _legalAreaService.entities$;
    this.cases$ = _matterService.filteredEntities$;
    this.attorneys$ = _staffService.filteredEntities$;
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

  ngOnInit(): void {
    this.filter();
    this._staffService.setFilter({ active: true, role: ['attorney'] });
    this.attorneys$.pipe(take(1)).subscribe((a) => {
      this.attorneys = [...a];
      this.filteredAttorneys = [...a];
    });
  }

  openTab(matter: Matter) {
    this._matterTabsService.add(matter.id);
  }

  addCase() {
    const addCaseModal = this._modalService.create({
      epContent: AddCaseComponent,
      epModalType: 'slideOver',
      epComponentParams: {
        matterType: 'case',
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
            // create the intake and send notification to client
            // atm the moment we only have one intake flow done and that is estate planning
            if (data.intake !== 'none') {
              let intake = {

                matter_id : newMatter.id,
                status: data.sendIntake ? 'sent' : 'firm only',
                type: data.intake,
              }
              if (data.sendIntake) {
               this._emailService.sendIntakeNotifcation(newMatter.email); 
               this._toastService.success('Intake sent to client');
              }
              this._intakeService.upsert(intake).subscribe((response) => {
                console.log(response);
              } 
              );
            }
          });
        });
      }
    });
  }

  addNote(id: number, note) {
    this._matterService.addMatterNote(id, note).subscribe();
  }

  createConversation(matter) {
    this._conversationService.createMatterConversation(matter.id).subscribe((response) => {
      this._firmService.getCurrentFirm().subscribe((firm) => {
        const message = `Hello, this is your attorney, ${matter.attorney.full_name}, at ${firm.name}. I would like to communicate with you through text. If you do not want me to text you, please reply STOP.`;
        this._conversationService
          .sendMessage(response.data.conversationSid, { body: message, author: matter.attorney_id })
          .subscribe(() => {});
      });
    });
  }

  setLegalArea(matter: Matter, legalArea: LegalArea) {
    this._matterService.update({ id: matter.id, legal_area_id: legalArea.id }).subscribe();
  }

  setAttorney(matter: Matter, event: AutocompleteSelectedEvent) {
    const selectedOptionValue = event.option.value;
    this._matterService.update({ id: matter.id, attorney_id: selectedOptionValue }).subscribe();
    this.filteredAttorneys = [...this.attorneys];
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
        this.cases$ = this._matterService.filteredEntities$.pipe(
          map((matters) => {
            return matters.sort(this.sortByFirstName(this.sortValues.direction));
          }),
        );
      } else if (this.sortValues.column === 'task') {
        this.cases$ = this._matterService.filteredEntities$.pipe(
          map((matters) => {
            return matters.sort(this.sortByTaskDate(this.sortValues.direction));
          }),
        );
      }
    } else {
      this.filter();
      this.cases$ = this._matterService.filteredEntities$;
    }
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
    // automatically create tasks based on conditions
    if (
      matter.matter_billing_setting.payment_type.toLowerCase() == 'legal insurance' &&
      status.status == 'complete'
    ) {
      this._matterService
        .addMatterTask({ name: 'Make Insurance Claim', matter_id: matter.id })
        .subscribe();
    }
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
