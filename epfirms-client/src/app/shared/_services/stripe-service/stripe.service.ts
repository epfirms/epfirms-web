import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private _http : HttpClient) { }

  integrate() : Observable<any> {
    return this._http.get('/api/stripe/integrate');
  }

  getConnectionStatus() : Observable<any> {
    return this._http.get('/api/stripe/status');
  }

  createPaymentSession(data) : Observable<any> {
    return this._http.post('/api/stripe/payment', data);
  }
  
  createSubscriptionSession(data) : Observable<any> {
    return this._http.post('/api/stripe/subscription', data);
  }

  createInvoice(invoiceId) : Observable<any> {
    return this._http.post('/api/stripe/invoice' , {invoice_id: invoiceId});
  }
}
