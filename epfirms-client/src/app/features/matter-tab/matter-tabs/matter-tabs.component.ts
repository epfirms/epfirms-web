import { Component, OnInit } from '@angular/core';
import { LegalArea } from '@app/core/interfaces/legal-area';
import { Matter } from '@app/core/interfaces/matter';
import { Staff } from '@app/core/interfaces/staff';
import { Tabs } from '@app/core/interfaces/tabs';
import { Observable } from 'rxjs';
import { DialogService } from '@ngneat/dialog';
import { MatterTabsService } from '@app/features/matter-tab/services/matter-tabs-service/matter-tabs.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { LegalAreaService } from '@app/firm-portal/_services/legal-area-service/legal-area.service';
import { EditClientComponent } from '@app/firm-portal/overlays/edit-client/edit-client.component';
import { ReviewService } from '@app/features/review/services/review.service';

@Component({
  selector: 'app-matter-tabs',
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
    private _dialogService: DialogService,
    private _reviewService: ReviewService
  ) {
    this.tabs$ = this._matterTabsService.tabs$;

    this.legalAreas$ = _legalAreaService.entities$;

    this.matters$ = this._matterTabsService.getOpenTabs()

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
      const editModal = this._dialogService.open(EditClientComponent, {data: {user: optionData.user}});
      editModal.afterClosed$.subscribe(data => {
        if (data) {
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

  changeSelectedIndex(index: number) {
    this._matterTabsService.setSelectedIndex(index);
  }

  trackByIndex(index, item) {
    return item.id;
  }

  sendReview(matterId: number, clientEmail: string): void {
    if (clientEmail.length) {
      this._reviewService.sendReview(clientEmail, matterId).subscribe();
    }
  }
}
