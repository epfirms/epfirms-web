import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LegalArea } from '@app/_models/legal-area';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LegalAreaService extends EntityCollectionServiceBase<LegalArea>  {

  constructor(
    private _http: HttpClient,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super('LegalArea', serviceElementsFactory);
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
          return of(response);
        })
      );
  }
}
