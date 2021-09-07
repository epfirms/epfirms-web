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

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss'],
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
export class CasesComponent implements OnInit {
  cases$: Observable<Matter[]>;
  legalAreas$: Observable<LegalArea[]>;
  statusFilterOptions: any[] = [
    'active', 'inactive', 'complete'
  ];
  
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

  paginator: {start: number, end: number} = {start: 0, end: 1};

  searchTerm: string = '';

  matterFilterValues = {
    matter_type: 'case',
    status: 'active',
    searchTerm: ''
  }

  constructor(
    private _matterService: MatterService,
    private _matterTabsService: MatterTabsService,
    private _legalAreaService: LegalAreaService,
    private _modalService: ModalService
  ) {
    this.legalAreas$ = _legalAreaService.entities$;
    this.cases$ = _matterService.filteredEntities$;
  }

  ngOnInit(): void {
    this.filter();
  }

  openTab(matter: Matter) {
    this._matterTabsService.add(matter.id);
  }

  addCase() {
    const addCaseModal = this._modalService.open(AddCaseComponent, {matter_type: 'case'}, {type: 'slideOver'});

    addCaseModal.afterClosed$.subscribe(closed => {
      if(closed.data) {
        this._matterService.create(closed.data).subscribe();
      }
    })
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

  // sendReview(matter, event) {
  //   console.log(event)
  //   event.stopPropagation()
  //   console.log(matter);
  //   this._emailService.sendReview(matter).subscribe();
  // }
}
