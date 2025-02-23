import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { take } from 'rxjs/operators';
import { MatterTabsService } from '../features/matter-tab/services/matter-tabs-service/matter-tabs.service';
import { SocketService } from '../core/services/socket.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  ConversationState,
  selectUnreadMessageCount,
} from '@app/features/conversation/store/conversation.store';
import { EpModalRef } from '@app/shared/modal/modal-ref';
import { EpModalService } from '@app/shared/modal/modal.service';
import { BugReporterModalComponent } from '@app/developer-tools/bug-reporter-modal/bug-reporter-modal.component';
import { AddClientComponent } from './overlays/add-client/add-client.component';
import { BugReportService } from '@app/developer-tools/services/bug-report.service';
import { HotToastService } from '@ngneat/hot-toast';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';

@Component({
  selector: 'app-firm-portal',
  templateUrl: './firm-portal.component.html',
  styleUrls: ['./firm-portal.component.scss'],
})
export class FirmPortalComponent implements OnInit {
  unreadMessageCount$: Observable<number> = this._store.select(selectUnreadMessageCount);

  // property that determines if the bug reporter modal is open
  isBugReporterModalOpen: boolean = false;

  // property that determines if the firm can see the billing tab
  billingActive : boolean;

  constructor(
    private _socketService: SocketService,
    private _currentUserService: CurrentUserService,
    private _authService: AuthService,
    private _matterTabsService: MatterTabsService,
    private _store: Store<{ conversation: ConversationState }>,
    private _modalService: EpModalService,
    private _bugReportService: BugReportService,
    private _toastService : HotToastService,
    private _stripeService: StripeService,
  ) {
    this._currentUserService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe(({ scope }) => {
        const accessToken = this._authService.accessTokenValue;
        this._socketService.connect(scope.firm_access.firm_id, accessToken);
      });
  }

  ngOnInit() {
    this._matterTabsService.init();
    this.getStripeStatus();
  }


  // billing can only be accessible if the firm has setup their 
  // account with stripe
  private getStripeStatus(): void {

    this._stripeService.getConnectionStatus().subscribe((res) => {

      if (res) {
        this.billingActive = res.isConnected;
      }
    });
  }

  minimizeMatterTabs(): void {
    this._matterTabsService.minimizeTabs();
  }

  openBugReportModal() {
    this._modalService.create({
      epContent: BugReporterModalComponent,
      epOkText: 'Submit',
      epCancelText: 'Cancel',
      epMaxWidth: '36rem',
      epAutofocus: null,
      epOnOk: (componentInstance) => {
        console.log('bug report modal ok', componentInstance);
        if (componentInstance.details !== '') {
          this._bugReportService
            .createGHIssue({ type: componentInstance.type, details: componentInstance.details, reporter: componentInstance.reporter})
            .subscribe((res) => {
              console.log('after github submission', res);
              if (res.status === 201) {
                this._toastService.success('Report Submitted Successfully!');
              }
            });
        }
      },
    });
  }
}
