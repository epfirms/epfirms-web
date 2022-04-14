import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpecificRequests } from '@app/core/interfaces/SpecificRequests';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecificRequestsService {

  constructor( private http : HttpClient) { }

  getSpecificRequests(matter_id : number) : Observable<any> {
    return this.http.get<SpecificRequests[]>(`/api/specific-requests/${matter_id}`);
  }

  upsertSpecificRequest(specificRequest : SpecificRequests) : Observable<any> {
    return this.http.post<SpecificRequests>(`/api/specific-requests`, specificRequest);
  }

  deleteSpecificRequest(specificRequest : SpecificRequests) : Observable<any> {
    return this.http.delete<SpecificRequests>(`/api/specific-requests/${specificRequest.id}`);
  }

  
}
