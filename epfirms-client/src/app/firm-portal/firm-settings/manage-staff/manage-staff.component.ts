import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { MatterTabsService } from '@app/features/matter-tab/services/matter-tabs-service/matter-tabs.service';
import { Observable } from 'rxjs';
import { Staff } from '@app/core/interfaces/staff';
import { Firm } from '@app/core/interfaces/firm';
import { FirmService } from '@app/firm-portal/_services/firm-service/firm.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';

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
    private _matterService: MatterService,
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
    // this._overlayService.add(AddStaffComponent);
  }

  editStaff() {
    // this._overlayService.add(EditStaffComponent);
  }

  deleteStaff() {
    // this._overlayService.add(DeleteStaffComponent);
  }

  addClient() {
    // this._overlayService.add(AddClientComponent);
  }

  openCase() {
    // this._overlayService.add(MatterTabsComponent);
  }

}
