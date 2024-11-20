import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { LegalArea } from '@app/core/interfaces/legal-area';
import { Matter } from '@app/features/matter/matter.model';
import { Staff } from '@app/core/interfaces/staff';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AddCaseComponent } from '../overlays/add-case/add-case.component';
import { LegalAreaService } from '../_services/legal-area-service/legal-area.service';
import { MatterService } from '../_services/matter-service/matter.service';
import { MatterTabsService } from '../../features/matter-tab/services/matter-tabs-service/matter-tabs.service';
import { StaffService } from '../_services/staff-service/staff.service';
import { AutocompleteSelectedEvent } from '@app/shared/autocomplete/autocomplete.component';
import { EpModalService } from '@app/shared/modal/modal.service';
import { ConversationService } from '@app/features/conversation/services/conversation.service';
import { FirmService } from '../_services/firm-service/firm.service';
import { Store } from '@ngrx/store';
import { selectDenormalizedMatters, selectLeads, selectSortValues } from '@app/features/matter/matter.selectors';
import { MatterActions, updateSort } from '@app/features/matter/matter.actions';
import * as TaskActions from '@app/features/task/task.actions';

export interface LeadFilter {
  status: string;
  attorney_id?: number;
  client_id?: number;
  searchTerm?: string;
}

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

  matterFilterValues$: BehaviorSubject<LeadFilter> = new BehaviorSubject<LeadFilter>({
    status: 'active',
  });

  sortValues$: Observable<any> = this.store.select(selectSortValues);

  leads$: Observable<any> = combineLatest([
    this.store.select(selectLeads),
    this.sortValues$,
    this.matterFilterValues$,
  ]).pipe(
    map(([cases, sortValues, searchInput]) => [this.filter(cases, searchInput), sortValues]),
    map(([cases, sortValues]) => {
      return sortValues.column ? this.sort(cases, sortValues.column, sortValues.direction) : cases;
    }),
  );
  
  legalAreas$: Observable<LegalArea[]>;

  statusFilterOptions: any[] = ['active', 'inactive'];

  paginator: { start: number; end: number } = { start: 0, end: 20 };

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

  constructor(
    private _matterService: MatterService,
    private _matterTabsService: MatterTabsService,
    private _legalAreaService: LegalAreaService,
    private _staffService: StaffService,
    private _modalService: EpModalService,
    private _conversationService: ConversationService,
    private _firmService: FirmService,
    private store: Store
  ) {
    this.legalAreas$ = _legalAreaService.entities$;
    this.attorneys$ = _staffService.filteredEntities$;
  }

  ngOnInit(): void {
    this.store.dispatch(MatterActions.loadMatters());
    this.store.dispatch(TaskActions.loadTasks());
    this._staffService.setFilter({ active: true, role: ['attorney'] });
    this.attorneys$.pipe(take(1)).subscribe((a) => {
      this.attorneys = [...a];
      this.filteredAttorneys = [...a];
    });
  }

  sort(data, column, direction) {
    return [...data].sort(this.sortByTaskDate(direction));
  }

  filter(entities: Matter[], search: LeadFilter) {
    let searchFields = Object.getOwnPropertyNames(search).filter(
      (field) => field !== 'searchTerm' && !!search[field],
    );

    return entities.filter((e) => {
      if (search.searchTerm && search.searchTerm.length) {
        return (
          searchFields.every((field) => e[field] === search[field]) &&
          JSON.stringify(e).toUpperCase().includes(search.searchTerm.toString().toUpperCase())
        );
      }

      return searchFields.every((field) => e[field] === search[field]);
    });
  }

  updateSortValues(column: string) {
    this.store.dispatch(updateSort({ sort: { column, direction: 'asc' } }));
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
    this._conversationService.createMatterConversation(matter.id).subscribe((response) => {
      this._firmService.getCurrentFirm().subscribe((firm) => {
        const message = `Thank you for contacting ${firm.name}. We would like to communicate with you through text. If you do not want us to text you, please reply STOP.`;
        this._conversationService
          .sendMessage(response.data.conversationSid, { body: message, author: matter.attorney_id })
          .subscribe(() => {});
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
        if (a.next_task && !b.next_task) {
          return -1;
        } else if (!a.next_task && b.next_task) {
          return 1;
        } else if (!a.next_task && !b.next_task) {
          return 0;
        } else {
          if (a.next_task.completed && !b.next_task.completed) {
            return 1;
          } else if (!a.next_task.completed && b.next_task.completed) {
            return -1;
          } else if (!a.next_task.completed && b.next_task.completed) {
            return 0;
          } else {
            return new Date(a.next_task.due).getTime() - new Date(b.next_task.due).getTime();
          }
        }
      } else {
        if (a.next_task && !b.next_task) {
          return 1;
        } else if (!a.next_task && b.next_task) {
          return -1;
        } else if (!a.next_task && !b.next_task) {
          return 0;
        } else {
          if (a.next_task.completed && !b.next_task.completed) {
            return -1;
          } else if (!a.next_task.completed && b.next_task.completed) {
            return 1;
          } else if (!a.next_task.completed && b.next_task.completed) {
            return 0;
          } else {
            return new Date(a.next_task.due).getTime() - new Date(b.next_task.due).getTime();
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

  filterAttorney(id: number) {
    if (this.matterFilterValues.attorney_id != id) {
      this.matterFilterValues.attorney_id = id;
    } else {
      this.matterFilterValues.attorney_id = null;
    }

    this.matterFilterValues$.next({ ...this.matterFilterValues$.value, attorney_id: id });
  }

  filterSearchInput(property, value) {
    this.matterFilterValues$.next({ ...this.matterFilterValues$.value, [property]: value });
  }

  trackByIndex(index, item) {
    return item.id;
  }
}
