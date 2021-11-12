import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Matter } from '@app/core/interfaces/matter';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientMatterService extends EntityCollectionServiceBase<Matter> {
  constructor(
    private _http: HttpClient,
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
  ) {
    super('Matter', serviceElementsFactory);
  }

  getOwn(): Observable<any> {
    return this._http.get<any>('/api/matters/user').pipe(
      map((response: Matter[]) => {
        this.addAllToCache(response);
        return of(response);
      })
    );
  }

  getMatterById(id: number): Observable<any> {
    return this.entities$.pipe(
      map((matters: Matter[]) => {
        return matters.find(m => m.id === id);
      })
    )
  }

  updateMatterIntake(matterIntake): Observable<any> {
    return this._http.patch<any>('/api/matters/intake', matterIntake).pipe(
      map((response: Matter) => {
        this.updateOneInCache(response);
        return of(response);
      })
    );
  }

  addSpouse(matterId, spouseData): Observable<any> {
    return this._http.post('/api/matters/intake/spouse', {matter_id: matterId, spouse: spouseData});
  }

  updateSpouse(matterId, spouseData): Observable<any> {
    return this._http.patch('/api/matters/intake/spouse', {matter_id: matterId, spouse: spouseData});
  }
}
