import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {catchError, take} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import { FirmService } from '@app/firm-portal/_services/firm-service/firm.service';

@Injectable({providedIn: 'root'})
export class CurrentFirmResolver implements Resolve<any> {

  constructor(private _firmService: FirmService) { }

  resolve(): Observable<any> | Observable<never> {
    return this._firmService.getCurrentFirm()
      .pipe(
        take(1),
        catchError(err => {
          console.error('Error fetching current firm ', err);
          return EMPTY;
        }),
      );
  }
}
