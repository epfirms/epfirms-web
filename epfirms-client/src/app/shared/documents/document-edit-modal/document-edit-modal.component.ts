import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AwsService } from '@app/shared/_services/aws.service';
import { DocumentService } from '@app/shared/_services/document-service/document.service';
import { Document } from '@app/core/interfaces/document';
import legalDocumentTypes from '@app/core/util/legalDocumentTypes';
@Component({
  selector: 'app-document-edit-modal',
  templateUrl: './document-edit-modal.component.html',
  styleUrls: ['./document-edit-modal.component.scss']
})
export class DocumentEditModalComponent implements OnInit {
  //bindings
  @Input() isEditVisible : boolean;
  // two way binding between isEditVisible and isEditVisibleChange
  @Output() isEditVisibleChange = new EventEmitter<boolean>();
  @Input() document : Document;

  //UI state variables
  displayDocTypeSelection : boolean = false;
  displaySharingSelection : boolean = false;


  //declaration of class variables
  legalDocumentTypes : Array<any>;
  updatedDocument : Document;
  constructor(
    private _docService: DocumentService,
    private _awsService: AwsService,
  ) { }

  ngOnInit(): void {
    this.updatedDocument = new Document(this.document.id, this.document.doc_name, this.document.user_id, this.document.firm_id,
    this.document.share_with, this.document.matter_id)
    this.updatedDocument.doc_type = this.document.doc_type;
    this.legalDocumentTypes = legalDocumentTypes;
  }

  toggleIsEditVisible(): void {
    this.isEditVisible = !this.isEditVisible;
    this.isEditVisibleChange.emit(this.isEditVisible);
  }
  //toggles displayDocTypeSelection : boolean
  toggleDisplayDocTypeSelection(): void {
    this.displayDocTypeSelection = !this.displayDocTypeSelection;
  }

  //toggles displayDocTypeSelection : boolean
  toggleDisplaySharing(): void {
    this.displaySharingSelection = !this.displaySharingSelection;
  }

  /**
  * @param docType the passed in valur of document type from the selection input
  * sets the type of the selected document
  */
  setType(docType): void {
    this.updatedDocument.doc_type = docType;
  }

  /**
  * @param document the selected document
  * @param event the blur event sourced from the document name input
  */
  setDocName(document, event) : void {
    this.updatedDocument.doc_name = event.target.value;

  }

  /**
  * @param sharingType the privacy type for document sharing
  * controls whether the client can see the file the firm uploads as well
  */
  setSharing(sharingType : string) : void {
    this.updatedDocument.share_with = sharingType;
  }

  // changes the class on mouseover
  toggleMouseEnter(event) : void {

    event.target.className = "text-white bg-indigo-600 cursor-default select-none relative py-2 pl-3 pr-9"
  }
  // changes the class on selections on mouse over
  toggleMouseLeave(event) : void {

    event.target.className = "text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
  }
  // submits the edited document to be changed on the cache, server, and aws
  submit(): void {
    //create the new key on the document
    const updatedValues = {
      userId: this.updatedDocument.user_id,
      docType: this.updatedDocument.doc_type,
      docName: this.updatedDocument.doc_name,
      matter_id: this.document.matter_id
    };

    // update the object in the cach and db
    this._awsService.updateDocument(this.document.doc_key, updatedValues).subscribe((res) => {
      this.updatedDocument.doc_key = res.doc_key;
      this._docService.update(this.updatedDocument).subscribe();
    });
  }

}
