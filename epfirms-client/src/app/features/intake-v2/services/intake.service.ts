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

  statusChangeAutomation(matterIntakeId : number, matter : Matter) : Observable<any> {

    let status : boolean = false;
    // make the change in db with api
    this.http.post(`/api/intake`, {id: matterIntakeId, is_review_eligible: true}).subscribe(intake => {
      if (intake[0].is_review_eligible) {
        // add the task

        this.matterService.addMatterTask({matter_id: matter.id, name: "REVIEW INTAKE", assignee_id: matter.attorney_id, due: new Date(Date.now() + (1000 * 60 * 60 * 48))}).subscribe(task => {
          console.log("task automation", task);
          if (task) {
            status = true;
          }
  
        });
      }
    });

    return of(status);
    
  } 
  
  


}
