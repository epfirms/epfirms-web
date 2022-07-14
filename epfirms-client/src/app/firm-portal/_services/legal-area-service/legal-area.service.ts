import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LegalArea } from '@app/core/interfaces/legal-area';
import { SocketService } from '@app/features/socket/socket.service';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LegalAreaService extends EntityCollectionServiceBase<LegalArea>  {

  constructor(
    private _http: HttpClient,
    private _socketService: SocketService,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super('LegalArea', serviceElementsFactory);

    this._socketService.on('add:legal-area', (entityData) => {
      this.addOneToCache(entityData);
    });

    this._socketService.on('update:legal-area', (entityData) => {
      this.updateOneInCache(entityData);
    });

    this._socketService.on('delete:legal-area', (entityData) => {
      this.removeOneFromCache(entityData);
    });
  }

  getLegalAreas(): Observable<any> {
    return this._http
      .get<any>('/api/legal-area')
      .pipe(
        map((response: LegalArea[]) => {
          this.addAllToCache(response);
          return of(response);
        })
      );
  }

  create(legalArea: LegalArea): Observable<any> {
    return this._http
      .post<any>('/api/legal-area', { legalArea })
      .pipe(
        map((response: LegalArea) => {
          this.addOneToCache(response);
          this._socketService.addOneToCacheSync('legal-area', response);
          return of(response);
        })
      );
  }

  deleteLegalArea(id: number): Observable<any> {
    return this._http
      .delete<any>('/api/legal-area', { body: {id} })
      .pipe(
        map((response: number) => {
          this.removeOneFromCache(response);
          this._socketService.deleteCacheSync('legal-area', response);
          return of(response);
        })
      );
  }
}
