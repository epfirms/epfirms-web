import { Component, Input, OnInit } from '@angular/core';
import { PdfViewerComponent } from '@app/shared/pdf-viewer/pdf-viewer.component';
import { AwsService } from '@app/shared/_services/aws.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { DocumentService } from '@app/shared/_services/document-service/document.service';
import { MatterActivityService } from '@app/shared/_services/matter-activity-service/matter-activity.service';
import { Document } from '@app/_models/document';
import { MatterActivity } from '@app/_models/matter-activity';
import { DialogService } from '@ngneat/dialog';

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
    private _dialog: DialogService
  ) {}

  toggleIsEditVisible(): void {
    this.isEditVisible = !this.isEditVisible;
    this.toggleVisibilty();
  }

  toggleVisibilty() {
    this.isVisible = !this.isVisible;
  }

  deleteDocument() {
    this._dialog.confirm({title: 'Delete document?', body: 'This action cannot be undone'}).afterClosed$.subscribe(confirmed => {
      if (confirmed) {
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
    })
  }

  downloadDocument(): void {
    this._awsService.downLoadDocument(this.document).subscribe((res) => {
      if (this.document.doc_key.endsWith('pdf')) {
        this._dialog.open(PdfViewerComponent, {
          data: { src: encodeURIComponent(res.url) },
          size: 'fullScreen'
        });
      } else {
        window.open(res.url, '_blank');
      }
    });
  }
}
