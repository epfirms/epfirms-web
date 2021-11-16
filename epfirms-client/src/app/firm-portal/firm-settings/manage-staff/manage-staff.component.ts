import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatterTabsComponent } from '@app/firm-portal/matter-tabs/matter-tabs.component';
import { AddCaseComponent } from '@app/firm-portal/overlays/add-case/add-case.component';
import { AddClientComponent } from '@app/firm-portal/overlays/add-client/add-client.component';
import { AddStaffComponent } from '@app/firm-portal/overlays/add-staff/add-staff.component';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { MatterTabsService } from '@app/firm-portal/_services/matter-tabs-service/matter-tabs.service';
import { OverlayService } from '@app/firm-portal/_services/overlay-service/overlay.service';
import { Matter } from '@app/_models/matter';
import { Observable } from 'rxjs';
import { Staff } from '@app/_models/staff';
import { EmployeeRole } from '@app/_models/role';
import { DeleteStaffComponent } from '@app/firm-portal/overlays/delete-staff/delete-staff.component';
import { Firm } from '@app/_models/firm';
import { FirmService } from '@app/firm-portal/_services/firm-service/firm.service';
import { EditStaffComponent } from '@app/firm-portal/overlays/edit-staff/edit-staff.component';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { take } from 'rxjs/operators';
import { DialogService } from '@ngneat/dialog';

@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.scss'],
  host: {
    'class': 'flex-1 relative z-0 flex flex-col overflow-hidden'
  }
})
export class ManageStaffComponent implements OnInit {
  staff$: Observable<Staff[]>;
  roles$: Observable<Firm[]>;
  user$: Observable<any>;

  user: any;

  constructor(
    private _overlayService: OverlayService, 
    private _matterService: MatterService,
    private _dialogService: DialogService,
    private _staffService: StaffService,
    private _firmService: FirmService,
    private _currentUserService: CurrentUserService,
    //private _roleService: EmployeeRoleService,
    private _matterTabsService: MatterTabsService, 
    private _router: Router) {
    this.staff$ = _staffService.entities$;
    this.user$ = this._currentUserService.user$;
    //this.roles$ = _staffService.entities$;
   }

  ngOnInit(): void {
    this._staffService.setFilter('staff');
    this._firmService.setFilter('roles');
    this.user$.pipe().subscribe(({user}) => {
      this.user = user;
    });

    // this._currentUserService.getCurrentUser().subscribe(userRes => {
    //   // create matter activity object
    //   let matterActivity = new MatterActivity(this.document.user_id, this.document.matter_id,
    //      "document", "delete", this.document.doc_name, `${userRes.user.first_name} ${userRes.user.last_name}`);
    //   this._matterActivityService.create(matterActivity).subscribe();
    // })
  }

  // openTab(staff: Staff) {
  //   this._staffService.add(staff.id);
  // }

  addStaff() {
    this._overlayService.add(AddStaffComponent);
  }

  editStaff(staff) {
    //opens the component in a dialog 
    const ref = this._dialogService.open(EditStaffComponent, {
      data: {
        staff: staff
      }
    });
  }

  deleteStaff(staff) {
    console.log(staff)
    console.log("I am HERE")
    this._staffService.deleteStaff(staff).subscribe();
    console.log("THIS IS THE AFTER")

  }

  addClient() {
    this._overlayService.add(AddClientComponent);
  }

  openCase() {
    this._overlayService.add(MatterTabsComponent);
  }

}
