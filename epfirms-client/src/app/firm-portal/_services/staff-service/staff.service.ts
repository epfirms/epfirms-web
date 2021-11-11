import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { map } from 'rxjs/operators';
import { Staff } from '@app/_models/staff';
import { SocketService } from '../socket-service/socket.service';

@Injectable({
  providedIn: 'root',
})
export class StaffService extends EntityCollectionServiceBase<Staff> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _http: HttpClient,
    private _socketService: SocketService
  ) {
    super('Staff', serviceElementsFactory);
    // Socket event listeners for syncing changes across firm users
    this._socketService.on('add:staff', (entityData) => {
      this.addOneToCache(entityData);
    });

    this._socketService.on('update:staff', (entityData) => {
      this.updateOneInCache(entityData);
    });

    this._socketService.on('delete:staff', (entityData) => {
      this.removeOneFromCache(entityData);
    });
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
        this._socketService.addOneToCacheSync('staff', response);
        return of(response);
      })
    );
  }

  updateStaff(body): Observable<any> {
    return this._http.post('http://localhost:4000/api/firm/staffUpdate', body).pipe(
      map((response: Staff) => {
        this._socketService.addOneToCacheSync('staff', response);
        return of(response);
      })
    );
  }

  deleteStaff(body): Observable<any> {
    console.log("HERE")
    return this._http.post('http://localhost:4000/api/firm/staffDelete', body);
    console.log("HERE2")
  }

  createClient(client): Observable<any> {
    return this._http.post<any>('/api/firm/clients', {
      client,
    });
  }
}
