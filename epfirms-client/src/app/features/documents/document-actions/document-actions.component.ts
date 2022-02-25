import { Component, Input, OnInit } from '@angular/core';
import { AwsService } from '@app/shared/_services/aws.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { DocumentService } from '@app/features/documents/services/document.service';
import { MatterActivityService } from '@app/shared/_services/matter-activity-service/matter-activity.service';
import { Document } from '@app/core/interfaces/document';
import { MatterActivity } from '@app/core/interfaces/matter-activity';
import { EpModalService } from '@app/shared/modal/modal.service';
import { ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-document-actions',
  templateUrl: './document-actions.component.html',
  styleUrls: ['./document-actions.component.scss']
})
export class DocumentActionsComponent {
  @Input() document: Document;

  isVisible: boolean = false;

  isEditVisible: boolean = false;

  constructor(
    private _docService: DocumentService,
    private _awsService: AwsService,
    private _matterActivityService: MatterActivityService,
    private _currentUserService: CurrentUserService,
    private _modalService: EpModalService
  ) {}

  toggleIsEditVisible(): void {
    this.isEditVisible = !this.isEditVisible;
    this.toggleVisibilty();
  }

  toggleVisibilty() {
    this.isVisible = !this.isVisible;
  }

  deleteDocument() {
    this._modalService.create({
      epContent: ConfirmDialogComponent,
      epOkText: 'Confirm',
      epCancelText: 'Cancel',
      epAutofocus: null,
      epComponentParams: {
        title: 'Delete document?',
        body: 'This action cannot be undone'
      },
      epOnOk: () => {
        this._docService.delete(this.document.id).subscribe((res) => {
          this._awsService.deleteDocument(this.document).subscribe();
          this._currentUserService.getCurrentUser().subscribe((userRes) => {
            // create matter activity object
            let matterActivity = new MatterActivity(
              this.document.user_id,
              this.document.matter_id,
              'document',
              'delete',
              this.document.doc_name,
              `${userRes.user.first_name} ${userRes.user.last_name}`
            );
            this._matterActivityService.create(matterActivity).subscribe();
          });
        });
      }
    });
  }

  downloadDocument(): void {
    this._awsService.downLoadDocument(this.document.doc_key).subscribe((res) => {
        window.open(res.url, '_blank');
    });
  }
}
