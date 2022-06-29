import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientSubscription } from '@app/core/interfaces/ClientSubscription';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientSubscriptionService {

  constructor(private http: HttpClient) { }


  createSubscription(subscription : ClientSubscription) {

    return this.http.post('/api/clientsubscription', subscription);
  }

  getAllWithFirmId(firmId : number) : Observable<any> {
    return this.http.get('/api/clientsubscription/firm/' + firmId);
  }
}
