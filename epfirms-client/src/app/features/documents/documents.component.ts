import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Document} from '../../core/interfaces/document';
import legalDocumentTypes from '@app/core/util/legalDocumentTypes';
import { MatterTab } from '@app/core/interfaces/matter-tab';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Matter } from '@app/core/interfaces/matter';
import { DocumentService } from './services/document.service';
import { AwsService } from '@app/shared/_services/aws.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  //Input binding from parent
  @Input()
  get matter() {
    return this._matter;
  }
  set matter(value: Matter) {
    this._matter = value;
  };

  private _matter: Matter;

  //declaration of observable properties
  loading$: Observable<boolean>;
  documents$: Observable<Document[]>;

  //declaration of UI state variables
  displayManageDocs : boolean = false;
  displayDocTypeSelection : boolean = false;
  displaySharingSelection : boolean = false;


  //declaration of class variables
  legalDocumentTypes : Array<any>;
  selectedDocuments : Array<Document>;
  currentDocument : Document;
  selectedFiles: FileList;

  //variables inherited from tab binding
  userId : number;
  firmId : number;

  //form controls
  search : string;

  constructor(private _docService : DocumentService, private _awsService : AwsService) {
    this.documents$ = _docService.filteredEntities$;
    this.loading$ = _docService.loading$;
  }

  ngOnInit(): void {
    //grab the legal document types and assign them to list; this may be dynamic in future
    this.legalDocumentTypes = legalDocumentTypes;

    this.userId = this.matter.client.id;
    this.firmId = this.matter.firm_id;
    // from the current tab grab the user id and firm id and set filter
    this._docService.setFilter(this.matter.client.id);
  }

  // toggles displayManageDocs : boolean
  toggleManageDocs(): void {
    this.displayManageDocs = !this.displayManageDocs;
  }

  //toggles displayDocTypeSelection : boolean
  toggleDisplayDocTypeSelection(document): void {
    this.currentDocument = document;
    this.displayDocTypeSelection = !this.displayDocTypeSelection;
  }

  //toggles displayDocTypeSelection : boolean
  toggleDisplaySharing(document): void {
    this.currentDocument = document;
    this.displaySharingSelection = !this.displaySharingSelection;
  }

  /**
  * @param docType the passed in valur of document type from the selection input
  * sets the type of the selected document
  */
  setType(docType): void {
    this.currentDocument.doc_type = docType;
  }

  /**
  * @param document the selected document
  * @param event the blur event sourced from the document name input
  */
  setDocName(document, event) : void {
    this.currentDocument = document;
    this.currentDocument.doc_name = event.target.value;

  }

  /**
  * @param sharingType the privacy type for document sharing
  * controls whether the client can see the file the firm uploads as well
  */
  setSharing(sharingType : string) : void {
    this.currentDocument.share_with = sharingType;
  }

  // changes the class on mouseover
  toggleMouseEnter(event) : void {

    event.target.className = "text-white bg-indigo-600 cursor-default select-none relative py-2 pl-3 pr-9"
  }
  // changes the class on selections on mouse over
  toggleMouseLeave(event) : void {

    event.target.className = "text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
  }

  /**
  *@param event the event that is passed when the input detects a file selection
  */
  onFilesSelected(event): void {
    const files : FileList = event.target.files;
    console.log(event);
    // create the document objects from the FILES
    this.selectedDocuments = this.createDocumentObjects(files);
    // this is a list of the actual FILE objects,
    // This contains the actual data
    this.selectedFiles = files;
    // opens the slide over to manage the documents
    this.toggleManageDocs();

  }




  /**
  * @param files the list of files that is from the event
  * @return returns an array of document objects that will be used to
  * create references in the database
  */
  createDocumentObjects(files: FileList): Array<Document>{
    let documentList : Array<Document> = [];
    for (let i = 0; i < files.length; i++){
      let currentFile = files[i];
      let document = new Document(i, currentFile.name, this.userId, this.firmId, "Firm Only", this.matter.id);

      documentList.push(document);
    }
    return documentList;
  }

  /**
  * @param doc the doc object that needs to be created in the database, this
  * should be user edited values or the default values
  */
  createDocuments(doc : Document){
      this._docService.add(doc);
  }

  // this method is called by the submit button on the manage documents slide over.
  // it takes the selectedDocuments and adds a key to them.
  // it then gets the generated URL for uploading to aws.
  // the FILE references are saved to the db with their appropriate DOCUMENT object.
  // then it loops through the selected FILE objects and uploads them to aws.
  upload(){
    this.selectedDocuments.forEach(doc => {
      //make the call to the server to generate the upload url
      this._awsService.getPresignedUrl(doc.user_id, doc.doc_type, doc.doc_name).pipe().subscribe(res => {
        //remove the temp id because the database will assign one
        doc.id = undefined;
        doc.doc_key = res.key;
        // for every FILE in the selected files, upload them to the s3 bucket.
        for (let i = 0; i < this.selectedFiles.length; i++){
          let currentFile = this.selectedFiles[i];

          this._awsService.uploadfileAWSS3(res.url, doc.doc_type, currentFile).subscribe((res) => {
          console.log(res);
          },
          ()=> {},
          ()=> {
            this.createDocuments(doc);
          });
        }
      });

    })
    this.toggleManageDocs();
  }

}
