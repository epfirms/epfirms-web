import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(private _http: HttpClient) {}

  integrate(): Observable<any> {
    return this._http.get('/api/stripe/integrate');
  }

  getConnectionStatus(): Observable<any> {
    return this._http.get('/api/stripe/status');
  }

  createPaymentSession(data): Observable<any> {
    return this._http.post('/api/stripe/payment', data);
  }

  createSubscriptionSession(data): Observable<any> {
    return this._http.post('/api/stripe/subscription', data);
  }

  createPaymentIntent(amount: number): Observable<any> {
    return this._http.post('/api/stripe/payment-intent', {
      paymentIntent: {
        amount: amount,
      },
    });
  }

  updateCreditBalance(customerId: string, amount: number): Observable<any> {
    return this._http.post('/api/stripe/credit-balance', {
      customerId,
      amount,
    });
  }

  getCurrentCustomer(): Observable<any> {
    return this._http.get('/api/stripe/customer');
  }
}
