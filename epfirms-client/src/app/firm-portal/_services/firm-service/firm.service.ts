import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { map } from 'rxjs/operators';
import { Firm } from '@app/_models/firm';
import { SocketService } from '../socket-service/socket.service';

@Injectable({
  providedIn: 'root',
})
export class FirmService extends EntityCollectionServiceBase<Firm> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _http: HttpClient,
    private _socketService: SocketService
  ) {
    super('Firm', serviceElementsFactory);
  }

  getCurrentFirm(){
    return this._http.get('/api/firm').pipe(
      map((response: Firm) => {
        this._socketService.addOneToCacheSync('firm', response);
        this.addOneToCache(response);
        return of(response);
      })
    );
  }

  delete(id): Observable<any> {
    return this._http.delete<any>('/api/matters');
  }

}
