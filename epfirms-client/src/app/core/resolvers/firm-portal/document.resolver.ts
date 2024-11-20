import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {catchError, take} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import { DocumentService } from '../../../features/documents/services/document.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '@app/features/auth/auth.actions';

@Injectable({providedIn: 'root'})
export class DocumentResolver implements Resolve<any> {

  constructor(private _documentService: DocumentService, private store: Store) { }

  resolve(): Observable<any> | Observable<never> {
    return this._documentService.getAll()
      .pipe(
        take(1),
        catchError(err => {
          console.error('Error fetching documents ', err);
          this.store.dispatch(AuthActions.signOut());
          return EMPTY;
        }),
      );
  }
}
