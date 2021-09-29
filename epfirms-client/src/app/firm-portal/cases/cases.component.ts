import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@app/modal/modal.service';
import { add } from '@app/store/matter-tabs/matter-tabs.actions';
import { LegalArea } from '@app/_models/legal-area';
import { Matter } from '@app/_models/matter';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatterTabsComponent } from '../matter-tabs/matter-tabs.component';
import { AddCaseComponent } from '../overlays/add-case/add-case.component';
import { LegalAreaService } from '../_services/legal-area-service/legal-area.service';
import { MatterService } from '../_services/matter-service/matter.service';
import { MatterTabsService } from '../_services/matter-tabs-service/matter-tabs.service';
import { OverlayService } from '../_services/overlay-service/overlay.service';
import { emailService } from '../../shared/_services/email-service/email.service';
import { map, take } from 'rxjs/operators';
import { Staff } from '@app/_models/staff';
import { StaffService } from '../_services/staff-service/staff.service';

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
      transition(':leave', [
        animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' })),
      ]),
    ]),
  ],
})
export class CasesComponent implements OnInit {
  displayedColumns = [
    'client',
    'task',
    'legal-area',
    'attorney',
    'status',
    'intake',
    'edit',
  ];

  attorneys$: Observable<Staff[]>;
  cases$: Observable<Matter[]>;
  legalAreas$: Observable<LegalArea[]>;
  statusFilterOptions: any[] = ['active', 'inactive', 'complete'];

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

  paginator: { start: number; end: number } = { start: 0, end: 1 };

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
    private _modalService: ModalService,
    private _staffService: StaffService
  ) {
    this.legalAreas$ = _legalAreaService.entities$;
    this.cases$ = _matterService.filteredEntities$;
    this.attorneys$ = _staffService.filteredEntities$;
  }

  ngOnInit(): void {
    this.filter();
    this._staffService.setFilter('attorney');
  }

  openTab(matter: Matter) {
    this._matterTabsService.add(matter.id);
  }

  addCase() {
    const addCaseModal = this._modalService.open(
      AddCaseComponent,
      { matter_type: 'case' },
      { type: 'slideOver' }
    );

    addCaseModal.afterClosed$.subscribe((closed) => {
      if (closed.data && closed.data.matter) {
        this._matterService.create(closed.data.matter).subscribe((response) => {
          response.pipe(take(1)).subscribe((newMatter) => {
            if (closed.data.note && closed.data.note.length && newMatter.id) {
              if (closed.data.note && closed.data.note.length) {
                this.addNote(newMatter.id, closed.data.note);
              }
            }
          });
        });
      }
    });
  }
  addNote(id: number, note: string) {
    const noteBody = {
      matter_id: id,
      note_string: note,
    };

    this._matterService.addMatterNote(noteBody).subscribe();
  }
  setLegalArea(matter: Matter, legalArea: LegalArea) {
    this._matterService
      .update({ id: matter.id, legal_area_id: legalArea.id })
      .subscribe();
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
            return matters.sort(
              this.sortByFirstName(this.sortValues.direction)
            );
          })
        );
      } else if (this.sortValues.column === 'task') {
        this.cases$ = this._matterService.filteredEntities$.pipe(
          map((matters) => {
            return matters.sort(this.sortByTaskDate(this.sortValues.direction));
          })
        );
      }
    } else {
      this.filter();
      this.cases$ = this._matterService.filteredEntities$;
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
          } else if (
            !a.matter_tasks[0].completed &&
            b.matter_tasks[0].completed
          ) {
            return -1;
          } else if (
            !a.matter_tasks[0].completed &&
            b.matter_tasks[0].completed
          ) {
            return 0;
          } else {
            return (
              new Date(a.matter_tasks[0].due).getTime() -
              new Date(b.matter_tasks[0].due).getTime()
            );
          }
        }
      } else {
        if (a.matter_tasks.length && !b.matter_tasks.length){
          return 1;
        } else if (!a.matter_tasks.length && b.matter_tasks.length) {
          return -1;
        } else if (!a.matter_tasks.length && !b.matter_tasks.length) {
          return 0;
        } else {
          if (a.matter_tasks[0].completed && !b.matter_tasks[0].completed) {
            return -1;
          } else if (!a.matter_tasks[0].completed && b.matter_tasks[0].completed){
            return 1
          } else if (!a.matter_tasks[0].completed && b.matter_tasks[0].completed) {
            return 0;
          } else {
            return new Date(a.matter_tasks[0].due).getTime() - new Date(b.matter_tasks[0].due).getTime()
          }
        }
      }

  }
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
