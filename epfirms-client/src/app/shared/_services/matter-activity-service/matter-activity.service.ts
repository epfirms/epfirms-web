import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatterActivity } from '@app/_models/matter-activity';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../current-user-service/current-user.service';

@Injectable({
  providedIn: 'root'
})
export class MatterActivityService {

  constructor(
    private _http : HttpClient,
    private currentUserService : CurrentUserService
  ) { }

  create(matterActivity : MatterActivity) : Observable<any> {
    return this._http.post("/api/matter-activity", matterActivity);
  }

  getAllByMatterId(matterId): Observable<any> {
    return this._http.get(`/api/matter-activity/${matterId}`)
  }

  createDocumentUpdate(documentData): void {
    this.currentUserService.getCurrentUser().subscribe(user => {
      let userData = user.user;
      let updatedValue = `Filename: ${documentData.doc_name},
       Document Type:${documentData.doc_type},
      Sharing: ${documentData.share_with}`;
      let staffName = `${userData.first_name} ${userData.last_name}`;
      let activity = new MatterActivity(userData.id, documentData.matter_id, 'document', 'update', updatedValue, staffName);
      this.create(activity).subscribe();
    });
  }

  createDocumentCreation(documentData): void {
    this.currentUserService.getCurrentUser().subscribe(user => {
      let userData = user.user;
      let staffName = `${userData.first_name} ${userData.last_name}`;
      let activity = new MatterActivity(userData.id, documentData.matter_id, 'document', 'add', documentData.doc_name, staffName);
      this.create(activity).subscribe();
    });
  }

  createMatterTaskCreation(task): void {
    this.currentUserService.getCurrentUser().subscribe(user => {
      let userData = user.user;
      let staffName = `${userData.first_name} ${userData.last_name}`;
      let activity = new MatterActivity(userData.id, task.matter_id, 'task', 'add', task.name, staffName);
      this.create(activity).subscribe();
    });
  }

  createMatterTaskUpdate(task): void {
    this.currentUserService.getCurrentUser().subscribe(user => {
      let userData = user.user;
      let staffName = `${userData.first_name} ${userData.last_name}`;
      let activity = new MatterActivity(userData.id, task.matter_id, 'task', 'update', task.name, staffName);
      this.create(activity).subscribe();
    });
  }


}
