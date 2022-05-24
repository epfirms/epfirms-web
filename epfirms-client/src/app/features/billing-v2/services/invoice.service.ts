import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '@app/core/interfaces/Invoice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http : HttpClient) {


   }

   upsert(invoice : Invoice): Observable<any> {
    return this.http.post('/api/invoice/', invoice);
   }

    get(id : number): Observable<any> {
    return this.http.get('/api/invoice/' + id);
   }

   delete(id : number): Observable<any> {
    return this.http.delete('/api/invoice/' + id);
   }
}
