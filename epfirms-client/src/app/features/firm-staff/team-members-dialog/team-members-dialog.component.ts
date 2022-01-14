import { Component, OnInit } from '@angular/core';
import { Staff } from '@app/core/interfaces/staff';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { DialogRef } from '@ngneat/dialog';
import { Observable, take } from 'rxjs';
import { FirmRoleService } from '../services/firm-role.service';
import { FirmTeamService } from '../services/firm-team.service';

@Component({
  selector: 'app-team-members-dialog',
  templateUrl: './team-members-dialog.component.html',
  styleUrls: ['./team-members-dialog.component.scss'],
})
export class TeamMembersDialogComponent implements OnInit {
  members: any[] = [];

  firmRoles: any[] = [];

  memberGroups: any[] = [];

  public staff$: Observable<Staff[]>;

  staffMembers: Staff[];

  filteredStaffMembers: Staff[];

  newMember = '';

  constructor(
    private _dialogRef: DialogRef,
    private _firmRoleService: FirmRoleService,
    private _staffService: StaffService,
    private _firmTeamService: FirmTeamService,
  ) {
    this.members = [...this._dialogRef.data.team.firm_team_members];
    this.staff$ = _staffService.filteredEntities$;
  }

  ngOnInit(): void {
    this._staffService.setFilter({ active: true });
    this.staff$.pipe(take(1)).subscribe((staff) => {
      this.staffMembers = [...staff];
      this.filteredStaffMembers = [...staff];
    });
    this.getMemberGroups();
  }

  getMemberGroups(){
    this._firmRoleService.get().subscribe((response) => {
      this.firmRoles = [...response.roles];

      this.memberGroups = this.firmRoles.map((role) => {
        return {
          role: role,
          member: this.members.find((m) => role.id === m.firm_role_id),
        };
      });
    });
  }

  setRole(event, roleId: number) {
    this._firmTeamService
      .addMember(this._dialogRef.data.team.id, event.option.value, roleId)
      .subscribe();
  }

  displayFn(value, options): string {
    const selectedAssignee = options.find((option) => option.value === value);
    return selectedAssignee ? selectedAssignee.viewValue : '';
  }

  filterStaffMembers(event) {
    this.filteredStaffMembers =
      event && event.length
        ? this.staffMembers.filter((staff) =>
            staff.user.full_name.toLowerCase().includes(event.toLowerCase()),
          )
        : [...this.staffMembers];
  }

  removeMember(id: number): void{
    this._firmTeamService.removeMember(id).subscribe(() => {
      const removedIndex = this.memberGroups.findIndex((g) => g.member && (g.member.id === id));
      this.memberGroups[removedIndex].member = undefined;
    });
  }

  close() {
    this._dialogRef.close();
  }
}
