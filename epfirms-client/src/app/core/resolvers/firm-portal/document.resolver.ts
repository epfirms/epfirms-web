import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {catchError, take} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import { DocumentService } from '../../../shared/_services/document-service/document.service';

@Injectable({providedIn: 'root'})
export class DocumentResolver implements Resolve<any> {

  constructor(private _documentService: DocumentService) { }

  resolve(): Observable<any> | Observable<never> {
    return this._documentService.getAll()
      .pipe(
        take(1),
        catchError(err => {
          console.error('Error fetching documents ', err);
          return EMPTY;
        }),
      );
  }
}
