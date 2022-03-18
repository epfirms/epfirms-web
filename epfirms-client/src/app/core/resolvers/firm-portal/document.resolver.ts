import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {catchError, take} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import { DocumentService } from '../../../features/documents/services/document.service';
import { AuthService } from '@app/core/services/auth.service';

@Injectable({providedIn: 'root'})
export class DocumentResolver implements Resolve<any> {

  constructor(private _documentService: DocumentService, private _authService: AuthService) { }

  resolve(): Observable<any> | Observable<never> {
    return this._documentService.getAll()
      .pipe(
        take(1),
        catchError(err => {
          this._authService.logout();
          console.error('Error fetching documents ', err);
          return EMPTY;
        }),
      );
  }
}
