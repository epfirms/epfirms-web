import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {catchError, take} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { AuthService } from '@app/core/services/auth.service';

@Injectable({providedIn: 'root'})
export class ClientResolver implements Resolve<any> {

  constructor(private _clientService: ClientService, private _authService: AuthService) { }

  resolve(): Observable<any> | Observable<never> {
    return this._clientService.getClients()
      .pipe(
        take(1),
        catchError(err => {
          this._authService.logout();
          console.error('Error fetching clients ', err);
          return EMPTY;
        }),
      );
  }
}
