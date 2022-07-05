import { Component, OnInit } from '@angular/core';
import { MatterTabsService } from '../features/matter-tab/services/matter-tabs-service/matter-tabs.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectUnreadMessageCount,
} from '@app/features/conversation/store/conversation.store';
import { EpModalService } from '@app/shared/modal/modal.service';
import { BugReporterModalComponent } from '@app/developer-tools/bug-reporter-modal/bug-reporter-modal.component';
import { BugReportService } from '@app/developer-tools/services/bug-report.service';
import { HotToastService } from '@ngneat/hot-toast';
import { connectSocket } from '@app/features/socket/socket.actions';

@Component({
  selector: 'app-firm-portal',
  templateUrl: './firm-portal.component.html',
  styleUrls: ['./firm-portal.component.scss'],
})
export class FirmPortalComponent implements OnInit {
  unreadMessageCount$: Observable<number> = this._store.select(selectUnreadMessageCount);

  // property that determines if the bug reporter modal is open
  isBugReporterModalOpen: boolean = false;

  constructor(
    private _matterTabsService: MatterTabsService,
    private _store: Store,
    private _modalService: EpModalService,
    private _bugReportService: BugReportService,
    private _toastService : HotToastService
  ) {
    this._store.dispatch(connectSocket())
  }

  ngOnInit() {
    this._matterTabsService.init();
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
