import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  get namespace(): string | null {
    return this._socket.ioSocket.nsp;
  }

  constructor(private _socket: Socket) {}

  // Create a manual socket connection
  connect(firmId: number, accessTokenValue: string): Observable<boolean> {
    this._socket.ioSocket.auth = { token: accessTokenValue };
    this._socket.ioSocket.nsp = `/firm-${firmId}`;
    this._socket.connect();

    this._socket.on('app:version', (currentVersion) => {
      const localVersion = localStorage.getItem('epfVersion');
      if (localVersion !== currentVersion) {
        localStorage.setItem('epfVersion', currentVersion);
        window.location.reload();
      }
    });

    return new Observable<boolean>((subscriber) => {
      try {
        this._socket.on('connect', () => {
          subscriber.next(true);
        });

        this._socket.on('disconnect', () => {
          subscriber.next(false);
        });

        this._socket.on('connect_error', (error) => {
          if (error && error.message === 'not authorized') {
            throw Error(error.message);
          } else {
            subscriber.next(false);
          }
        });
      } catch (err) {
        subscriber.error(err);
      }
    });
  }

  disconnect() {
    return new Observable<boolean>((subscriber) => {
      try {
        if (this._socket && this._socket.ioSocket && this._socket.ioSocket.connected) {
          this._socket.disconnect();
        }

        subscriber.complete();
      } catch (err) {
        subscriber.error(err);
      }
    });
  }


  // Sync entity data to other sockets on namespace
  addOneToCacheSync(name: string, data: any) {
    this._socket.emit('add', { name, data });
  }

  updateCacheSync(name: string, data: any) {
    this._socket.emit('update', { name, data });
  }

  deleteCacheSync(name: string, data: any) {
    this._socket.emit('delete', { name, data });
  }

  on(event: string, callback: Function) {
    return this._socket.on(event, callback);
  }

  isSocketConnected(): boolean {
    return this._socket.ioSocket.connected;
  }
}
