import { Component, Input, OnInit } from '@angular/core';
import { AwsService } from '@app/shared/_services/aws.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { DocumentService } from '@app/shared/_services/document-service/document.service';
import { MatterActivityService } from '@app/shared/_services/matter-activity-service/matter-activity.service';
import {Document} from '@app/_models/document';
import { MatterActivity } from '@app/_models/matter-activity';
@Component({
  selector: 'app-document-actions',
  templateUrl: './document-actions.component.html',
  styleUrls: ['./document-actions.component.scss']
})
export class DocumentActionsComponent implements OnInit {
  @Input() document : Document;
  isVisible : boolean = false;
  isEditVisible : boolean = false;
  constructor(
    private _docService: DocumentService,
    private _awsService: AwsService,
    private _matterActivityService: MatterActivityService,
    private _currentUserService : CurrentUserService,
  ) { }

  ngOnInit(): void {

  }

  toggleIsEditVisible(): void {
    this.isEditVisible = !this.isEditVisible;
    this.toggleVisibilty();
    console.log(this.isEditVisible);
  }


  toggleVisibilty(){this.isVisible = !this.isVisible}

  // changes the class on mouseover
  toggleMouseEnter(event) : void {

    event.target.className = "bg-gray-100 text-gray-900 block px-4 py-2 text-sm"
  }
  // changes the class on selections on mouse over
  toggleMouseLeave(event) : void {

    event.target.className = "text-gray-700 block px-4 py-2 text-sm"
  }

  deleteDocument(){
    this._docService.delete(this.document.id).subscribe(res => {
      this._awsService.deleteDocument(this.document).subscribe();
      this._currentUserService.getCurrentUser().subscribe(userRes => {
        // create matter activity object
        let matterActivity = new MatterActivity(this.document.user_id, this.document.matter_id,
           "document", "delete", this.document.doc_name, `${userRes.user.first_name} ${userRes.user.last_name}`);
        this._matterActivityService.create(matterActivity).subscribe();
      })
    });
  }

  downloadDocument(): void {
    this._awsService.downLoadDocument(this.document).subscribe(res => {
      window.open(res.url, "blank")
    });
  }

}
