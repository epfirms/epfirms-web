import { Component, OnInit } from '@angular/core';
import { ModalService } from '@app/modal/modal.service';
import { matterTabsReducer } from '@app/store/matter-tabs/matter-tabs.reducer';
import { LegalArea } from '@app/_models/legal-area';
import { Matter } from '@app/_models/matter';
import { Staff } from '@app/_models/staff';
import { Tabs } from '@app/_models/tabs';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EditClientComponent } from '../overlays/edit-client/edit-client.component';
import { FirmService } from '../_services/firm-service/firm.service';
import { LegalAreaService } from '../_services/legal-area-service/legal-area.service';
import { MatterService } from '../_services/matter-service/matter.service';
import { MatterTabsService } from '../_services/matter-tabs-service/matter-tabs.service';
import { StaffService } from '../_services/staff-service/staff.service';

@Component({
  selector: 'matter-tabs',
  templateUrl: './matter-tabs.component.html',
  styleUrls: ['./matter-tabs.component.scss'],
  host: {
    'class': 'fixed inset-0 left-64 transition-expand ease-in-out duration-500',
    '[class.translate-y-tabs]': '!expanded',
    '[class.translate-y-0]': 'expanded'
  }
})
export class MatterTabsComponent implements OnInit {
  tabs$: Observable<Tabs>;
  
  staff$: Observable<Staff[]>;

  matters$: Observable<Matter[]>;

  legalAreas$: Observable<LegalArea[]>;

  selectedSubtab: string = 'tasks';

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
    }
  ];

  expanded: boolean = false;

  constructor(
    public _matterTabsService: MatterTabsService,
    private _staffService: StaffService,
    private _matterService: MatterService,
    private _legalAreaService: LegalAreaService,
    private _modalService: ModalService
  ) {
    this.tabs$ = this._matterTabsService.tabs$;

    this.legalAreas$ = _legalAreaService.entities$;

    this.matters$ = combineLatest([_matterService.entities$, this.tabs$]).pipe(
      map(this.filterById),
    );

    this.staff$ = _staffService.entities$;
  }

  ngOnInit(): void {
    this._matterTabsService.tabs$.subscribe(tabs => {
      this.expanded = tabs.expanded;
    })
  }

  toggleExpanded(expandTabs: boolean): void {
    this._matterTabsService.toggleExpand();
  }

  closeTab({ index }) {
    this._matterTabsService.remove(index);
  }

  changeSubtab(subtab: string) {
    this.selectedSubtab = subtab;
  }

  setLegalArea(matter: Matter, legalArea: LegalArea) {
    this._matterService.update({id: matter.id, legal_area_id: legalArea.id}).subscribe();
  }

  setStatus(matter: Matter, status) {
    this._matterService.update({id: matter.id, ...status}).subscribe();
  }

  addSpouse(matter: Matter, spouseId: number) {
    this._matterService.update({id: matter.id, spouse_id: spouseId}).subscribe();
  }

  addPointOfContact(matter: Matter, pointOfContactId: number) {
    this._matterService.update({id: matter.id, point_of_contact_id: pointOfContactId}).subscribe();
  }

  sendIntake(matterId: number) {
    this._matterService.createIntake(matterId).subscribe();
  }

  handleUserInfoOption(matter, optionData) {
    if (optionData.option === 'edit') {
      const editModal = this._modalService.open(EditClientComponent, {user: optionData.user});
      editModal.afterClosed$.subscribe(closed => {
        if (closed) {
          this._matterService.update({id: matter.id}).subscribe();
        }
      });
    } else if (optionData.option === 'remove') {
      if (optionData.label === 'spouse') {
        this._matterService.update({id: matter.id, spouse_id: null}).subscribe();
      } else if (optionData.label === 'point of contact') {
        this._matterService.update({id: matter.id, point_of_contact_id: null}).subscribe();
      }
    }
  }

  private filterById = ([matters, matterTabs]) => {
    return matterTabs.openTabs.reduce((acc, curr) => {
      const matter = matters.find((matter: Matter) => matter.id === curr);
      if (matter) {
        return [...acc, matter];
      } else {
        return acc;
      }
    }, []);
  }
}
