import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { map } from 'rxjs/operators';
import { Staff } from '@app/core/interfaces/staff';
import { SocketService } from '../../../core/services/socket.service';

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
    return this._http.get('/api/firm/employees').pipe(
      map((response: Staff[]) => {
        this.addAllToCache(response);
        return of(response);
      })
    );
  }

  createStaff(body): Observable<any> {
    return this._http.post('/api/firm/employees', body).pipe(
      map((response: any) => {
        this.addOneToCache(response.data);
        this._socketService.addOneToCacheSync('staff', response.data);
        return response;
      })
    );
  }

  createClient(client): Observable<any> {
    return this._http.post<any>('/api/firm/clients', {
      client,
    });
  }

  updateStaff(id, staff): Observable<any> {
    return this._http.patch<any>(`/api/firm/employees/${id}`, staff).pipe(
      map((response: any) => {
        this.updateOneInCache(response.data);
        this._socketService.updateCacheSync('staff', response.data);
        return of(response);
      })
    );
  }

  removeStaff(id): Observable<any> {
    return this._http.delete<any>(`/api/firm/employees/${id}`).pipe(
      map((response: any) => {
        this.updateOneInCache(response.data);
        this._socketService.updateCacheSync('staff', response.data);
        return of(response);
      })
    );
  }
}
