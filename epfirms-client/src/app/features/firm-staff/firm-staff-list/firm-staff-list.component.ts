import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Staff } from '@app/core/interfaces/staff';
import { PhoneValidator } from '@app/features/user/directives/async-phone-validator.directive';
import { UserService } from '@app/features/user/services/user.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';
import { EpModalService } from '@app/shared/modal/modal.service';
import { Observable } from 'rxjs';
import { FirmTeamService } from '../services/firm-team.service';
import { StaffMemberDialogComponent } from '../staff-member-dialog/staff-member-dialog.component';

@Component({
  selector: 'app-firm-staff-list',
  templateUrl: './firm-staff-list.component.html',
  styleUrls: ['./firm-staff-list.component.scss'],
})
export class FirmStaffListComponent implements OnInit {
  staff$: Observable<Staff[]>;

  teams: any[] = [];

  constructor(
    private _staffService: StaffService,
    private _modalService: EpModalService,
    private _teamService: FirmTeamService,
    private _userService: UserService,
  ) {
    this.staff$ = _staffService.filteredEntities$;
  }

  ngOnInit(): void {
    this._staffService.setFilter({ active: true });
  }

  openAddStaffDialog() {
    this._modalService.create({
      epContent: StaffMemberDialogComponent,
      epOkText: 'Add staff member',
      epCancelText: 'Cancel',
      epComponentParams: {
        title: 'New',
        staffForm: new FormGroup({
          hourly_rate: new FormControl('0'),
          role: new FormControl('other', Validators.required),
          user: new FormGroup({
            first_name: new FormControl('', Validators.required),
            last_name: new FormControl('', Validators.required),
            phone: new FormControl(
              null,
              [],
              PhoneValidator.createValidator(this._userService, 'FIXED_LINE'),
            ),
            email: new FormControl(null, Validators.email),
          }),
        }),
      },
      epMaxWidth: '36rem',
      epAutofocus: null,
      epOnOk: (componentInstance) => {
        this._staffService.createStaff(componentInstance.staffForm.value).subscribe((res) => {
          if (res.data.role === 'attorney') {
            this._teamService.create(res.data.id).subscribe();
          }
        });
      },
    });
  }

  openEditStaffDialog(staff) {
    this._modalService.create({
      epContent: StaffMemberDialogComponent,
      epOkText: 'Save changes',
      epCancelText: 'Cancel',
      epComponentParams: {
        title: 'Update',
        staffForm: new FormGroup({
          id: new FormControl(staff.id),
          hourly_rate: new FormControl(staff.hourly_rate),
          role: new FormControl(staff.role, Validators.required),
          user: new FormGroup({
            id: new FormControl(staff.user.id),
            first_name: new FormControl(staff.user.first_name, Validators.required),
            last_name: new FormControl(staff.user.last_name, Validators.required),
            phone: new FormControl(
              staff.user.phone,
              [],
              PhoneValidator.createValidator(this._userService, 'FIXED_LINE'),
            ),
            email: new FormControl(staff.user.email, Validators.email),
          }),
        }),
      },
      epMaxWidth: '36rem',
      epAutofocus: null,
      epOnOk: (componentInstance) => {
        this._staffService
          .updateStaff(componentInstance.staffForm.value.id, componentInstance.staffForm.value)
          .subscribe();
      },
    });
  }

  removeStaffMember(staff) {
    this._modalService.create({
      epContent: ConfirmDialogComponent,
      epOkText: 'Confirm',
      epCancelText: 'Cancel',
      epAutofocus: null,
      epComponentParams: {
        title: 'Remove staff member',
        body: 'Are you sure you want to remove this staff member? This action cannot be undone.',
      },
      epOnOk: () => {
        this._staffService.removeStaff(staff.id).subscribe();
      },
    });
  }
}
