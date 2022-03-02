import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor( private http : HttpClient) { }

  upsert(data) : Observable<any> {
    return this.http.post('/api/contract', data);
  }

  getWithMatterId(id) : Observable<any> {
    return this.http.get(`/api/contract/${id}`);
  }

  createTemplate(data) : Observable<any> {
    console.log("THE SERVICE ON THE FRONT",data);
    return this.http.post(`/api/contract-template`, data);
  }

  getTemplatesByFirmId() : Observable<any> {
    return this.http.get(`/api/contract-template/firm`);
  }

  deleteTemplate(id) : Observable<any> {
    return this.http.delete(`/api/contract-template/${id}`);
  }
}
