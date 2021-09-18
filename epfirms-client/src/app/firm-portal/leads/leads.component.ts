import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@app/modal/modal.service';
import { LegalArea } from '@app/_models/legal-area';
import { Matter } from '@app/_models/matter';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AddCaseComponent } from '../overlays/add-case/add-case.component';
import { LegalAreaService } from '../_services/legal-area-service/legal-area.service';
import { MatterService } from '../_services/matter-service/matter.service';
import { MatterTabsService } from '../_services/matter-tabs-service/matter-tabs.service';
import { OverlayService } from '../_services/overlay-service/overlay.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
  host: {
    class: 'flex-1 relative z-0 flex flex-col overflow-hidden',
  },
  animations: [
    trigger("toggleAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.95)" }),
        animate("100ms ease-out", style({ opacity: 1, transform: "scale(1)" }))
      ]),
      transition(":leave", [
        animate("75ms", style({ opacity: 0, transform: "scale(0.95)" }))
      ])
    ])
  ]
})
export class LeadsComponent implements OnInit {
  leads$: Observable<Matter[]>;
  legalAreas$: Observable<LegalArea[]>;
  statusFilterOptions: any[] = [
    'active', 'inactive'
  ];

  paginator: {start: number, end: number} = {start: 0, end: 1};

  searchTerm: string = '';

  statusOptions: any[] = [
    {
      name: 'active case',
      status: 'active',
      matter_type: 'case'
    },
    {
      name: 'inactive case',
      status: 'inactive',
      matter_type: 'case'
    },
    {
      name: 'active lead',
      status: 'active',
      matter_type: 'lead'
    },
    {
      name: 'inactive lead',
      status: 'inactive',
      matter_type: 'lead'
    },
    {
      name: 'completed case',
      status: 'complete',
      matter_type: 'case'
    },
  ];
  
  matterFilterValues = {
    matter_type: 'lead',
    status: 'active',
    searchTerm: ''
  }

  constructor(
    private _overlayService: OverlayService,
    private _matterService: MatterService,
    private _matterTabsService: MatterTabsService,
    private _legalAreaService: LegalAreaService,
    private _router: Router,
    private _modalService: ModalService
  ) {
    this.legalAreas$ = _legalAreaService.entities$;
    this.leads$ = _matterService.filteredEntities$;
  }

  ngOnInit(): void {
    this.filter();
  }

  openTab(matter: Matter) {
    this._matterTabsService.add(matter.id);
  }

  addLead() {
    const addLeadModal = this._modalService.open(AddCaseComponent, {matter_type: 'lead'}, {type: 'slideOver'});

    addLeadModal.afterClosed$.subscribe((closed) => {
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
    })
  }
  
  addNote(id: number, note: string) {
    const noteBody = {
      matter_id: id,
      note_string: note,
    };

    this._matterService.addMatterNote(noteBody).subscribe();
  }

  setLegalArea(matter: Matter, legalArea: LegalArea) {
    this._matterService.update({id: matter.id, legal_area_id: legalArea.id}).subscribe();
  }

  setStatus(matter: Matter, status) {
    this._matterService.update({id: matter.id, ...status}).subscribe();
  }

  setPagination(current: {start: number, end: number}) {
    this.paginator = current;
  }

  filterStatus(value: string) {
    this.matterFilterValues.status = value;
    this.filter();
  }

  filter() {
    const filterValues = Object.assign({}, this.matterFilterValues);
    this._matterService.setFilter(filterValues);
  }
}
