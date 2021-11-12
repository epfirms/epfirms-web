import { Component, OnInit } from '@angular/core';
import { AwsService } from '@app/shared/_services/aws.service';
import { DocumentService } from '@app/shared/_services/document-service/document.service';
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
  constructor(private _documentService: DocumentService, private _dialogService: DialogService, private _docService: DocumentService, private _awsService: AwsService) { }

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
    })
  }

  handleUpload(document, file){
      //create the doc key and assign into object
      document.doc_key = `${document.user_id}/${document.doc_type}/${document.doc_name}`
      //make the call to the server to generate the upload url
      this._awsService.getPresignedUrl(document.doc_key, document.doc_type).pipe().subscribe(res => {

        //assign the created document their link
        document.aws_link = res.url
        //remove the temp id because the database will assign one
        document.id = undefined;
        //set the case_id
        //doc.matter_id = this._matter.id;
        //add the doc to the database
        this.createDocuments(document);
        // for every FILE in the selected files, upload them to the s3 bucket.
          this._awsService.uploadfileAWSS3(document.aws_link, document.doc_type, file).subscribe(() => {
            this.load();
          });
      });
  }

  createDocuments(doc : Document){
    this._docService.add(doc);
}

  load() {
    this._documentService.getOwn().subscribe(res => {
      this.documents = res;
    });
  }

  downloadDocument(document): void {
    this._awsService.downLoadDocument(document).subscribe(res => {
      window.open(res.url, "blank")
    });
  }
}
