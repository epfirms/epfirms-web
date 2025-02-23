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

  createInvoice(invoiceId): Observable<any> {
    return this._http.post('/api/stripe/invoice', { invoice_id: invoiceId });
  }

  updateInvoice(invoice) : Observable<any> {
    return this._http.post(`/api/stripe/invoice/update`, {invoice});
  }
   
  deleteInvoice(invoiceId): Observable<any> {
    return this._http.delete(`/api/stripe/invoice/${invoiceId}`);
  }

  finalizeInvoice(invoiceId): Observable<any> {
    return this._http.put(`/api/stripe/invoice/${invoiceId}`, {});
  }

  createPaymentIntent(amount: number): Observable<any> {
    return this._http.post('/api/stripe/payment-intent', {
      paymentIntent: {
        amount: amount,
      },
    });
  }

  createSetupIntent(): Observable<any> {
    return this._http.post('/api/stripe/setup-intent', {});
  }

  updateCreditBalance(customerId: string, amount: number): Observable<any> {
    return this._http.post('/api/stripe/credit-balance', {
      customerId,
      amount,
    });
  }

  updateCustomer(customerId: string, changes): Observable<any> {
    return this._http.post(`/api/stripe/customer/${customerId}`, changes);
  }

  getCurrentCustomer(): Observable<any> {
    return this._http.get('/api/stripe/customer');
  }

  getPaymentMethods(customerId: string): Observable<any> {
    return this._http.get(`/api/stripe/customer/${customerId}/payment-methods`);
  }

  updatePaymentIntent(id, amount): Observable<any> {
    return this._http.post(`/api/stripe/payment-intent/${id}`, { amount });
  }

  createClientSubscription(subscriptionId: number) : Observable<any> {

    return this._http.post('/api/stripe/client-subscription', {subscription_id: subscriptionId});
  }
}
