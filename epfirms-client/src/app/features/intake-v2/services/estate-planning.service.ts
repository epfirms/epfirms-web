import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstatePlanningService {

  constructor(private http : HttpClient) { }


  getEstatePlanningQuestions(matter_id : number) : Observable<any> {
    return this.http.get<any>(`/api/estate-planning/${matter_id}`);
  }

  upsertEstatePlanningQuestions(estatePlanningQuestions : any) : Observable<any> {
    return this.http.post<any>(`/api/estate-planning`, estatePlanningQuestions);
  }

  deleteEstatePlanningQuestions(estatePlanningQuestions : any) : Observable<any> {
    return this.http.delete<any>(`/api/estate-planning/${estatePlanningQuestions.id}`);
  }

}
