import { Component } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { take } from 'rxjs/operators';
import { MatterTabsService } from './_services/matter-tabs-service/matter-tabs.service';
import { SocketService } from '../core/services/socket.service';

@Component({
  selector: 'app-firm-portal',
  templateUrl: './firm-portal.component.html',
  styleUrls: ['./firm-portal.component.scss'],
  host: {
    class: 'inset-0 flex flex-col absolute overflow-hidden',
  },
})
export class FirmPortalComponent {
  navItems = [
    {
      name: 'Home',
      link: '/firm'
    },
    {
      name: 'Cases',
      link: 'cases'
    },
    {
      name: 'Leads',
      link: 'leads'
    },
    {
      name: 'Client Directory',
      link: 'clients'
    },
    {
      name: 'Firm Settings',
      link: 'settings'
    },
  ]
  constructor(private _socketService: SocketService, private _currentUserService: CurrentUserService, private _authService: AuthService, private _matterTabsService: MatterTabsService) {
    this._currentUserService.getCurrentUser().pipe(take(1)).subscribe(({scope}) => {
      const accessToken = _authService.accessTokenValue;
      this._socketService.connect(scope.firm_access.firm_id, accessToken);
    });
  }

  minimizeMatterTabs(): void {
    this._matterTabsService.minimizeTabs();
  }
}
