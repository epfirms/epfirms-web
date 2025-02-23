import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {catchError, take} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import { LegalAreaService } from '@app/firm-portal/_services/legal-area-service/legal-area.service';
import { AuthService } from '@app/core/services/auth.service';

@Injectable({providedIn: 'root'})
export class LegalAreaResolver implements Resolve<any> {

  constructor(private _legalAreaService: LegalAreaService, private _authService: AuthService) { }

  resolve(): Observable<any> | Observable<never> {
    return this._legalAreaService.getLegalAreas()
      .pipe(
        take(1),
        catchError(err => {
          this._authService.logout();
          console.error('Error fetching legal areas ', err);
          return EMPTY;
        }),
      );
  }
}
