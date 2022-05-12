import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecedentPropertyService {

  constructor(private http : HttpClient) {

   }


   getDecedentPropertyWithDecedentId(decedentId : number) : Observable<any> {
      return this.http.get(`/api/decedent-property/${decedentId}`);
   }

   upsert(decedentProperty : any) : Observable<any> {
      return this.http.post(`/api/decedent-property`, decedentProperty);
   }
   delete(decedentProperty : any) : Observable<any> {
      return this.http.delete(`/api/decedent-property/${decedentProperty.id}`);
   }

}
