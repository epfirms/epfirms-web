import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { map } from 'rxjs/operators';
import { Client } from '@app/_models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends EntityCollectionServiceBase<Client> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _http: HttpClient
  ) {
    super('Client', serviceElementsFactory);
  }

  getClients(): Observable<any> {
    return this._http.get('/api/firm/clients').pipe(
      map((response: Client[]) => {
        this.addAllToCache(response);
        return of(response);
      })
    );
  }

  createClient(client): Observable<any> {
    return this._http.post<any>('/api/firm/clients', {
      client,
    }).pipe(
      map((response: Client) => {
        this.addOneToCache(response);
        return of(response);
      })
    );
  }

  updateClient(client): Observable<any> {
    return this._http.patch<any>('/api/user', client).pipe(
      map((response: Client)=> {
        this.updateOneInCache(response);
        return of(response);
      })
    )
  }
}
