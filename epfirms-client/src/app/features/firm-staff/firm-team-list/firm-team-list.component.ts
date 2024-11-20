import { Component, OnInit } from '@angular/core';
import { Staff } from '@app/core/interfaces/staff';
import { TeamService } from '@app/features/team/services/team.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { EpModalService } from '@app/shared/modal/modal.service';
import { Dictionary } from '@ngrx/entity';
import { concatMap, from, map, Observable, switchMap, take } from 'rxjs';
import { TeamMembersDialogComponent } from '../team-members-dialog/team-members-dialog.component';

@Component({
  selector: 'app-firm-team-list',
  templateUrl: './firm-team-list.component.html',
  styleUrls: ['./firm-team-list.component.scss'],
})
export class FirmTeamListComponent implements OnInit {
  staff$: Observable<Dictionary<Staff>>;

  teams: any[] = [];

  constructor(
    private _staffService: StaffService,
    private _modalService: EpModalService,
    private _teamService: TeamService,
  ) {
    this.staff$ = _staffService.entityMap$;
  }

  ngOnInit(): void {
    this._staffService.setFilter({ active: true });

    this.getTeams();
  }

  getTeams() {
    this._teamService
      .getAll()
      .pipe(
        switchMap((res) => from(res.data)),
        concatMap((team: any) =>
          this._teamService
            .getAllMembers(team.id)
            .pipe(map((res) => ({ team, members: res.data }))),
        ),
      )
      .subscribe((res) => {
        this.teams.push(res);
      });
  }

  addTeamMember(team) {
    this._modalService.create({
      epContent: TeamMembersDialogComponent,
      epOkText: null,
      epMaxWidth: '48rem',
      epCancelText: 'Close',
      epAutofocus: null,
      epComponentParams: {
        team,
      },
      epOnCancel: (componentInstance) => {
        team.members = componentInstance.members;
      }
    });
  }
}
