import { Injectable } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private _socket: Socket, private _authService: AuthService) {}

  // Create a manual socket connection
  connect(firmId: number, accessTokenValue: string): void {
    this._socket.ioSocket.auth = { token: accessTokenValue };
    this._socket.ioSocket.nsp = `/firm-${firmId}`;
    this._socket.connect();
    this._socket.on('connect_error', (error) => {
      if (error && error.message === 'not authorized') {
        this._authService.logout();
      }
    });

    this.on('app:version', (currentVersion) => {
      const localVersion = localStorage.getItem('epfVersion');
      if (localVersion !== currentVersion) {
        localStorage.setItem('epfVersion', currentVersion);
        window.location.reload();
      }
    });
  }

  disconnect(): void {
    this._socket.disconnect();
  }

  test(): void {
    this._socket.emit('test', { msg: 'hello world' });
  }

  //   http(method: string, url: string, name: string, data: any) {
  //       this._socket.emit('request', {method, url, name, data});
  //   }

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
