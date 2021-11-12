import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import {Document} from '../../../core/interfaces/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends EntityCollectionServiceBase<Document> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, private http: HttpClient) {
    super('Document', serviceElementsFactory);
   }

   getOwn(): Observable<any> {
    return this.http.get('/api/documents/own');
  }
}
