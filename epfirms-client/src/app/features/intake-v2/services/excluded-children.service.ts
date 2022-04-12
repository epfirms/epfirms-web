import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcludedChildrenService {

  constructor( private http : HttpClient) { }

  getExcludedChildren(matter_id : number) : Observable<any> {
    return this.http.get<any>(`/api/excluded-children/${matter_id}`);
  }

  upsertExcludedChildren(excludedChildren : any) : Observable<any> {
    return this.http.post<any>(`/api/excluded-children`, excludedChildren);
  }

  deleteExcludedChildren(excludedChildren : any) : Observable<any> {
    return this.http.delete<any>(`/api/excluded-children/${excludedChildren.id}`);
  }

}
