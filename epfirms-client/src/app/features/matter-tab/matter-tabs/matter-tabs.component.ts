import { Component, OnInit } from '@angular/core';
import { LegalArea } from '@app/core/interfaces/legal-area';
import { Matter } from '@app/core/interfaces/matter';
import { Staff } from '@app/core/interfaces/staff';
import { Tabs } from '@app/core/interfaces/tabs';
import { catchError, Observable, of, take } from 'rxjs';
import { MatterTabsService } from '@app/features/matter-tab/services/matter-tabs-service/matter-tabs.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { LegalAreaService } from '@app/firm-portal/_services/legal-area-service/legal-area.service';
import { ReviewService } from '@app/features/review/services/review.service';
import { HotToastService } from '@ngneat/hot-toast';
import { EpModalService } from '@app/shared/modal/modal.service';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { AddClientComponent } from '@app/firm-portal/overlays/add-client/add-client.component';
import { IntakeService } from '@app/features/intake-v2/services/intake.service';
import { emailService } from '@app/shared/_services/email-service/email.service';

@Component({
  selector: 'app-matter-tabs',
  templateUrl: './matter-tabs.component.html',
  styleUrls: ['./matter-tabs.component.scss'],
  host: {
    class: 'z-10 w-full h-screen',
  },
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

  expanded: boolean = false;

  constructor(
    public _matterTabsService: MatterTabsService,
    private _staffService: StaffService,
    private _matterService: MatterService,
    private _legalAreaService: LegalAreaService,
    private _reviewService: ReviewService,
    private _toastService: HotToastService,
    private _modalService: EpModalService,
    private _clientService: ClientService,
    private _intakeService: IntakeService,
    private _emailService: emailService,
  ) {
    this.tabs$ = this._matterTabsService.tabs$;

    this.legalAreas$ = _legalAreaService.entities$;

    this.matters$ = this._matterTabsService.getOpenTabs();

    this.staff$ = _staffService.entities$;
  }

  ngOnInit(): void {
    this._matterTabsService.tabs$.subscribe((tabs) => {
      this.expanded = tabs.expanded;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    this._matterService.update({ id: matter.id, legal_area_id: legalArea.id }).subscribe();
  }

  setStatus(matter: Matter, status) {
    this._matterService.update({ id: matter.id, ...status }).subscribe();
  }

  addSpouse(matter: Matter, spouseId: number) {
    this._matterService.update({ id: matter.id, spouse_id: spouseId }).subscribe();
  }

  addPointOfContact(matter: Matter, pointOfContactId: number) {
    this._matterService
      .update({ id: matter.id, point_of_contact_id: pointOfContactId })
      .subscribe();
  }

 

  handleUserInfoOption(matter, optionData) {
    if (optionData.option === 'edit') {
      this._modalService.create({
        epContent: AddClientComponent,
        epOkText: 'Save changes',
        epCancelText: 'Cancel',
        epAutofocus: null,
        epMaxWidth: '36rem',
        epComponentParams: {
          user: optionData.user,
        },
        epOnOk: (componentInstance) => {
          this._clientService
            .updateClient(componentInstance.clientForm.value)
            .subscribe((response) => {
              response.pipe(take(1)).subscribe(() => {
                this._matterService.update({ id: matter.id }).subscribe();
              });
            });
        },
      });
    } else if (optionData.option === 'remove') {
      if (optionData.label === 'spouse') {
        this._matterService.update({ id: matter.id, spouse_id: null }).subscribe();
      } else if (optionData.label === 'point of contact') {
        this._matterService.update({ id: matter.id, point_of_contact_id: null }).subscribe();
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
      this._reviewService
        .sendReview(clientEmail, matterId)
        .pipe(
          this._toastService.observe({
            loading: 'Sending...',
            success: () => 'Review email sent',
            error: () => 'An error occurred. Review email was not sent',
          }),
          catchError((error) => of(error)),
        )
        .subscribe();
    }
  }
}
