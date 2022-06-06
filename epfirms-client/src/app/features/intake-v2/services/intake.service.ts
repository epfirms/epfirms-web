import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntakeService {

  constructor(private http : HttpClient, private matterService : MatterService) { }

getOneWithMatterId(id) : Observable<any> {
    return this.http.get(`/api/intake/${id}`);
  }

  upsert(data) : Observable<any> {
    return this.http.post(`/api/intake`, data);
  }

  delete(id) : Observable<any> {
    return this.http.delete(`/api/intake/${id}`);
  }

  statusChangeAutomation(matterIntake) : Observable<any> {
    
    return this.http.put(`/api/intake/automation`, matterIntake);
  } 
  
  


}
