import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {catchError, take} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import { ClientMatterService } from '@app/client-portal/_services/matter-service/client-matter.service';

@Injectable({providedIn: 'root'})
export class ClientMatterResolver implements Resolve<any> {

  constructor(private _clientMatterService: ClientMatterService) { }

  resolve(): Observable<any> | Observable<never> {
    return this._clientMatterService.getOwn()
      .pipe(
        take(1),
        catchError(err => {
          console.error('Error fetching client matters ', err);
          return EMPTY;
        }),
      );
  }
}
