import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { map } from 'rxjs/operators';
import { Client } from '@app/_models/client';
import { Socket } from 'ngx-socket-io';
import { SocketService } from '../socket-service/socket.service';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  constructor(
    private _http: HttpClient,
    private _socketService: SocketService
  ) {

  }

  getClients(): Observable<any> {
    return this._http.get('/api/firm/clients').pipe(
      map((response: Client[]) => {

        return of(response);
      })
    );
  }

  createClient(client): Observable<any> {
    return this._http.post<any>('/api/firm/clients', {
      client,
    }).pipe(
      map((response: Client) => {
        this._socketService.addOneToCacheSync('client', response);
        return of(response);
      })
    );
  }

  updateClient(client): Observable<any> {
    return this._http.patch<any>('/api/user', client).pipe(
      map((response: Client)=> {
        this._socketService.updateCacheSync('client', response);
        return of(response);
      })
    )
  }
}
