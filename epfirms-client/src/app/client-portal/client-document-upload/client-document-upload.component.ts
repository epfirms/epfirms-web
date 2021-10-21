import { Component, OnInit } from '@angular/core';
import { Matter } from '@app/_models/matter';
import { Observable } from 'rxjs';
import { ClientMatterService } from '../_services/matter-service/client-matter.service';
import { Document } from '@app/_models/document';
import { ModalRef } from '@app/modal/modal-ref';
import legalDocumentTypes from '@app/_util/legalDocumentTypes';

@Component({
  selector: 'app-client-document-upload',
  templateUrl: './client-document-upload.component.html',
  styleUrls: ['./client-document-upload.component.scss']
})
export class ClientDocumentUploadComponent {
  matters$: Observable<Matter[]>;
  selectedMatter: Matter;
  document: any;
  selectedFile;
  selectedDocumentType: any;
  legalDocumentTypes : Array<any> = legalDocumentTypes;

  constructor(private _clientMatterService: ClientMatterService, private _modalRef: ModalRef) {
    this.matters$ = _clientMatterService.entities$;
  }

  setSelectedMatter(matter: Matter) {
    this.selectedMatter = matter;
  }

  setSelectedDocumentType(documentType: any) {
    this.selectedDocumentType = documentType;
  }

  onFilesSelected(event): void {
    const files : FileList = event.target.files;

    // create the document objects from the FILES
    this.document = this.createDocumentObjects(files);
    // this is a list of the actual FILE objects,
    // This contains the actual data
    this.selectedFile = files[0];
  }

  createDocumentObjects(files: FileList): Document{
    let documentList : Array<Document> = [];
    for (let i = 0; i < files.length; i++){
      let currentFile = files[i];
      let document = new Document(i, currentFile.name, this.selectedMatter.client_id, this.selectedMatter.firm_id, "Firm and Clients", this.selectedMatter.id);

      documentList.push(document);
    }
    return documentList[0];
  }

  submit() {
    this.document.doc_type = this.selectedDocumentType.value;
    this.close({
      document: this.document,
      selectedFile: this.selectedFile
    });
  }

  close(data?: any) {
    this._modalRef.close(data);
  }
}
