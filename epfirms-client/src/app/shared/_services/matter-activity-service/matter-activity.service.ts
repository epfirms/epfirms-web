import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatterActivity } from '@app/core/interfaces/matter-activity';
import { AuthService } from '@app/features/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatterActivityService {

  constructor(
    private _http : HttpClient,
    private authService: AuthService
  ) { }

  create(matterActivity : MatterActivity) : Observable<any> {
    return this._http.post("/api/matter-activity", matterActivity);
  }

  getAllByMatterId(matterId): Observable<any> {
    return this._http.get(`/api/matter-activity/${matterId}`)
  }

  createDocumentUpdate(documentData): void {
    this.authService.idTokenResult$.subscribe(token => {
      let updatedValue = `Filename: ${documentData.doc_name},
       Document Type:${documentData.doc_type},
      Sharing: ${documentData.share_with}`;
      let staffName = `${token.claims.name}`;
      let activity = new MatterActivity(token.claims.id, documentData.matter_id, 'document', 'update', updatedValue, staffName);
      this.create(activity).subscribe();
    });
  }

  createDocumentCreation(documentData): void {
    this.authService.idTokenResult$.subscribe(token => {
      let staffName = `${token.claims.name}`;
      let activity = new MatterActivity(token.claims.id, documentData.matter_id, 'document', 'add', documentData.doc_name, staffName);
      this.create(activity).subscribe();
    });
  }

  createMatterTaskCreation(task): void {
    this.authService.idTokenResult$.subscribe(token => {
      let staffName = `${token.claims.name}`;
      let activity = new MatterActivity(token.claims.id, task.matter_id, 'task', 'add', task.name, staffName);
      this.create(activity).subscribe();
    });
  }

  createMatterTaskUpdate(task): void {
    this.authService.idTokenResult$.subscribe(token => {
      let staffName = `${token.claims.name}`;
      let activity = new MatterActivity(token.claims.id, task.matter_id, 'task', 'update', task.name, staffName);
      this.create(activity).subscribe();
    });
  }


}
