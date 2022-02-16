import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { catchError, map } from 'rxjs/operators';
import { Client } from '@app/core/interfaces/client';
import { Socket } from 'ngx-socket-io';
import { SocketService } from '../../../core/services/socket.service';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends EntityCollectionServiceBase<Client> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _http: HttpClient,
    private _socketService: SocketService,
    private _toastService: HotToastService,
  ) {
    super('Client', serviceElementsFactory);

    // Socket event listeners for syncing changes across firm users
    this._socketService.on('add:client', (entityData) => {
      this.addOneToCache(entityData);
    });

    this._socketService.on('update:client', (entityData) => {
      this.updateOneInCache(entityData);
    });

    this._socketService.on('delete:client', (entityData) => {
      this.removeOneFromCache(entityData);
    });
  }

  getClients(): Observable<any> {
    return this._http.get('/api/firm/clients').pipe(
      map((response: Client[]) => {
        this.addAllToCache(response);
        return of(response);
      }),
    );
  }

  emit() {
    // this.socket.emit('test', {msg: 'hello world'});
  }

  test() {
    // return this.socket.fromEvent('response').pipe(map((data: any) => data.msg));
  }

  createClient(client): Observable<any> {
    return this._http
      .post<any>('/api/firm/clients', {
        client,
      })
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        }),
        this._toastService.observe({
          loading: 'Adding client...',
          success: () => 'Successfully added!',
          error: () => 'An error occurred when adding the client',
        }),
        map((response: Client) => {
          this.addOneToCache(response);
          this._socketService.addOneToCacheSync('client', response);
          return response;
        }),
      );
  }

  updateClient(client): Observable<any> {
    return this._http.patch<any>('/api/user', client).pipe(
      map((response: Client) => {
        this.updateOneInCache(response);
        this._socketService.updateCacheSync('client', response);
        return of(response);
      }),
    );
  }
}
