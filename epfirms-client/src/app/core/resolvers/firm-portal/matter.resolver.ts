import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {catchError, take} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';

@Injectable({providedIn: 'root'})
export class MatterResolver implements Resolve<any> {

  constructor(private _matterService: MatterService) { }

  resolve(): Observable<any> | Observable<never> {
    return this._matterService.getAll()
      .pipe(
        take(1),
        catchError(err => {
          console.error('Error fetching matters ', err);
          return EMPTY;
        }),
      );
  }
}
