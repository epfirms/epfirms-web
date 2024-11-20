import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {catchError, take} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import { FirmService } from '@app/firm-portal/_services/firm-service/firm.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '@app/features/auth/auth.actions';

@Injectable({providedIn: 'root'})
export class CurrentFirmResolver implements Resolve<any> {

  constructor(private _firmService: FirmService, private store: Store) { }

  resolve(): Observable<any> | Observable<never> {
    return this._firmService.getCurrentFirm()
      .pipe(
        take(1),
        catchError(err => {
          console.error('Error fetching current firm ', err);
          this.store.dispatch(AuthActions.signOut());
          return EMPTY;
        }),
      );
  }
}
