import { Component, OnInit } from '@angular/core';
import { Staff } from '@app/core/interfaces/staff';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { DialogService } from '@ngneat/dialog';
import { Observable } from 'rxjs';
import { StaffMemberDialogComponent } from '../staff-member-dialog/staff-member-dialog.component';

@Component({
  selector: 'app-firm-staff-list',
  templateUrl: './firm-staff-list.component.html',
  styleUrls: ['./firm-staff-list.component.scss'],
})
export class FirmStaffListComponent implements OnInit {
  staff$: Observable<Staff[]>;

  user$: Observable<any>;

  user: any[] = [];

  teams: any[] = [];

  constructor(
    private _staffService: StaffService,
    private _currentUserService: CurrentUserService,
    private _dialog: DialogService,
  ) {
    this.staff$ = _staffService.filteredEntities$;
    this.user$ = this._currentUserService.user$;
  }

  ngOnInit(): void {
    this._staffService.setFilter({ active: true });
    this.user$.pipe().subscribe(({ user }) => {
      this.user = user;
    });
  }

  openAddStaffDialog() {
    const dialog = this._dialog.open(StaffMemberDialogComponent);
    dialog.afterClosed$.subscribe((data) => {
      if (data) {
        this._staffService.createStaff(data).subscribe();
      }
    });
  }

  openEditStaffDialog(staff) {
    const dialog = this._dialog.open(StaffMemberDialogComponent, {
      data: {
        staff,
      },
    });
    dialog.afterClosed$.subscribe((data) => {
      if (data) {
        this._staffService.updateStaff(data.id, data).subscribe();
      }
    });
  }

  removeStaffMember(staff) {
    const dialog = this._dialog.confirm({
      title: `Remove staff member`,
      body: `Are you sure you want to remove this staff member? This action cannot be undone.`,
    });

    dialog.afterClosed$.subscribe((confirmed) => {
      if (confirmed) {
        this._staffService.removeStaff(staff.id).subscribe();
      }
    });
  }
}
