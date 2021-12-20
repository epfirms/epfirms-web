import { Component, OnInit } from '@angular/core';
import { AwsService } from '@app/shared/_services/aws.service';
import { DocumentService } from '@app/features/documents/services/document.service';
import { Document } from '@app/core/interfaces/document';
import { ClientDocumentUploadComponent } from '../client-document-upload/client-document-upload.component';
import { DialogService } from '@ngneat/dialog';

@Component({
  selector: 'app-client-documents',
  templateUrl: './client-documents.component.html',
  styleUrls: ['./client-documents.component.scss']
})
export class ClientDocumentsComponent implements OnInit {
  documents: Document[];
  constructor(
    private _documentService: DocumentService,
    private _dialogService: DialogService,
    private _docService: DocumentService,
    private _awsService: AwsService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  upload() {
    const documentUploadModal = this._dialogService.open(ClientDocumentUploadComponent, {
      enableClose: false
    });

    documentUploadModal.afterClosed$.subscribe((data) => {
      if (data) {
        this.handleUpload(data.document, data.selectedFile);
        console.log(data);
      }
    });
  }

  handleUpload(document, file) {
    //make the call to the server to generate the upload url
    this._awsService
      .getPresignedUrl(document.user_id, document.doc_type, document.doc_name, file.type)
      .pipe()
      .subscribe((res) => {
        //remove the temp id because the database will assign one
        document.id = undefined;
        document.doc_key = res.key;

        //add the doc to the database
        this.createDocuments(document);
        // for every FILE in the selected files, upload them to the s3 bucket.
        this._awsService.uploadfileAWSS3(res.url, file.type, file).subscribe(() => {
          this.load();
        });
      });
  }

  createDocuments(doc: Document) {
    this._docService.add(doc);
  }

  load() {
    this._documentService.getOwn().subscribe((res) => {
      this.documents = res;
    });
  }

  downloadDocument(document): void {
    this._awsService.downLoadDocument(document.doc_key).subscribe((res) => {
      window.open(res.url, 'blank');
    });
  }
}
