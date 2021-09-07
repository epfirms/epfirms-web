import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { map } from 'rxjs/operators';
import { Staff } from '@app/_models/staff';

@Injectable({
  providedIn: 'root',
})
export class StaffService extends EntityCollectionServiceBase<Staff> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _http: HttpClient
  ) {
    super('Staff', serviceElementsFactory);
  }

  getStaff(): Observable<any> {
    return this._http.get('/api/firm/staff').pipe(
      map((response: Staff[]) => {
        this.addAllToCache(response);
        return of(response);
      })
    );
  }

  createStaff(body): Observable<any> {
    return this._http.post('http://localhost:4000/api/firm/staff', body).pipe(
      map((response: Staff) => {
        this.addOneToCache(response);
        return of(response);
      })
    );
  }

  getClients(): Observable<any> {
    return this._http.get('/api/firm/clients').pipe(
      map((response: Staff[]) => {
        this.addAllToCache(response);
        return of(response);
      })
    );
  }

  createClient(client): Observable<any> {
    return this._http.post<any>('/api/firm/clients', {
      client,
    });
  }
}
