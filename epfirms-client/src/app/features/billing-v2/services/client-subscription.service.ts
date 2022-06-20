import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientSubscription } from '@app/core/interfaces/ClientSubscription';

@Injectable({
  providedIn: 'root'
})
export class ClientSubscriptionService {

  constructor(private http: HttpClient) { }


  createSubscription(subscription : ClientSubscription) {

    return this.http.post('/api/clientsubscription', subscription);
  }
}
