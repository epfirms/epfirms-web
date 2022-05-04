import { Component, OnInit } from '@angular/core';
import { Staff } from '@app/core/interfaces/staff';
import { TeamService } from '@app/features/team/services/team.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { Observable, take } from 'rxjs';
import { FirmTeamService } from '../services/firm-team.service';

@Component({
  selector: 'app-team-members-dialog',
  templateUrl: './team-members-dialog.component.html',
  styleUrls: ['./team-members-dialog.component.scss'],
})
export class TeamMembersDialogComponent implements OnInit {
  members: any[] = [];

  roles: any[] = [
    'attorney',
    'associate attorney',
    'paralegal',
    'legal assistant',
    'receptionist',
    'office manager',
    'other',
  ];

  public staff$: Observable<Staff[]>;

  staffMembers: Staff[];

  filteredStaffMembers: Staff[];

  team;

  selectedEmployeeId: number;

  selectedRole: string = null;

  constructor(
    private _staffService: StaffService,
    private _firmTeamService: FirmTeamService,
    private _teamService: TeamService,
  ) {
    this.staff$ = _staffService.filteredEntities$;
  }

  ngOnInit(): void {
    this._staffService.setFilter({ active: true });
    this.staff$.pipe(take(1)).subscribe((staff) => {
      this.staffMembers = [...staff];
      this.filteredStaffMembers = [...staff];
      this.members = this.team.members.reduce((acc, curr) => {
        acc.push({
          ...curr,
          firm_employee: staff.find((s) => s.id === curr.firm_employee_id),
        });
        return acc;
      }, []);
    });
  }

  setRole(event, roleId: number) {
    this._firmTeamService.addMember(this.team.id, event.option.value, roleId).subscribe();
  }

  updateMember(member, event) {
    this._teamService
      .updateMember(member.team_id, member.id, {
        include_in_group_chat: member.include_in_group_chat,
      })
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

  removeMember(member): void {
    this._teamService.removeEmployee(this.team.team.id, member.firm_employee_id, member.role).subscribe((res) => {
      this.members = this.members.filter((m) => m.id !== member.id);
    });
  }

  addMember(): void {
    this._teamService
      .addEmployee(this.team.team.id, this.selectedEmployeeId, this.selectedRole)
      .subscribe((res) => {
        this.members.push({
          ...res.data,
          firm_employee: this.staffMembers.find((s) => s.id === res.data.firm_employee_id),
        });
        this.selectedEmployeeId = null;
        this.selectedRole = null;
      });
  }

  setSelectedEmployee(event) {
    this.selectedEmployeeId = event.option.value;
  }

  checkIfRoleExists(role: string): boolean {
    return this.members.some((m) => m.role === role);
  }
}
