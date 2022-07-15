import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointeeService {

  constructor(private http : HttpClient) { }

  getAllAppointeesForClient(clientId : number) : Observable<any> {
    return this.http.get(`/api/v1/appointeev2/client/${clientId}`);
  }

  createAppointee(appointee : any) : Observable<any> {
    return this.http.post('/api/v1/appointeev2', appointee);
  }

  updateAppointee(appointee : any) : Observable<any> {
    return this.http.put('/api/v1/appointeev2', appointee);
  }

  deleteAppointee(appointee : any) : Observable<any> {
    return this.http.delete(`/api/v1/appointeev2/${appointee.id}`);
  }

  getAppointeeWithId(id : number) : Observable<any> {
    return this.http.get(`/api/v1/appointeev2/${id}`);
  }

}
