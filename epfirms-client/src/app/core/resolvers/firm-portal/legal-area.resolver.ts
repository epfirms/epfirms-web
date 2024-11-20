import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {catchError, take} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import { LegalAreaService } from '@app/firm-portal/_services/legal-area-service/legal-area.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '@app/features/auth/auth.actions';

@Injectable({providedIn: 'root'})
export class LegalAreaResolver implements Resolve<any> {

  constructor(private _legalAreaService: LegalAreaService, private store: Store) { }

  resolve(): Observable<any> | Observable<never> {
    return this._legalAreaService.getLegalAreas()
      .pipe(
        take(1),
        catchError(err => {
          console.error('Error fetching legal areas ', err);
          this.store.dispatch(AuthActions.signOut());
          return EMPTY;
        }),
      );
  }
}
