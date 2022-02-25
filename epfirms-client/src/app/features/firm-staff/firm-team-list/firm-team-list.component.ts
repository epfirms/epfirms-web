import { Component, OnInit } from '@angular/core';
import { Staff } from '@app/core/interfaces/staff';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { EpModalService } from '@app/shared/modal/modal.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { Dictionary } from '@ngrx/entity';
import { concatMap, map, Observable, take } from 'rxjs';
import { FirmTeamService } from '../services/firm-team.service';
import { TeamMembersDialogComponent } from '../team-members-dialog/team-members-dialog.component';

@Component({
  selector: 'app-firm-team-list',
  templateUrl: './firm-team-list.component.html',
  styleUrls: ['./firm-team-list.component.scss']
})
export class FirmTeamListComponent implements OnInit {
  staff$: Observable<Dictionary<Staff>>;

  user$: Observable<any>;

  user: any[] = [];

  teams: any[] = [];

  constructor(
    private _staffService: StaffService,
    private _currentUserService: CurrentUserService,
    private _firmTeamService: FirmTeamService,
    private _modalService: EpModalService
  ) {
    this.staff$ = _staffService.entityMap$;
    this.user$ = this._currentUserService.user$;
  }

  ngOnInit(): void {
    this._staffService.setFilter({ active: true });
    this.user$.pipe(take(1)).subscribe(({ user }) => {
      this.user = user;
    });

    this.getTeams();
  }

  getTeams() {
    const mapTeamOwner = (staff) =>
      this._firmTeamService.getAll().pipe(
        map(({ teams }) => {
          return teams.map((t) => ({ ...t, owner: staff[t.owner] }));
        }),
      );
    this.staff$.pipe(concatMap(mapTeamOwner)).subscribe((teams) => {
      this.teams = teams;
    });
  }

  addTeamMember(team) {
    this._modalService.create({
      epContent: TeamMembersDialogComponent,
      epOkText: 'Save',
      epCancelText: null,
      epAutofocus: null,
      epComponentParams: {
        team
      }
    });
  }
}
