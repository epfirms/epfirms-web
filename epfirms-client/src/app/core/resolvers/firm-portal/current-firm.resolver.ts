import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {catchError, take} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import { FirmService } from '@app/firm-portal/_services/firm-service/firm.service';
import { AuthService } from '@app/core/services/auth.service';

@Injectable({providedIn: 'root'})
export class CurrentFirmResolver implements Resolve<any> {

  constructor(private _firmService: FirmService, private _authService: AuthService) { }

  resolve(): Observable<any> | Observable<never> {
    return this._firmService.getCurrentFirm()
      .pipe(
        take(1),
        catchError(err => {
          this._authService.logout();
          console.error('Error fetching current firm ', err);
          return EMPTY;
        }),
      );
  }
}
