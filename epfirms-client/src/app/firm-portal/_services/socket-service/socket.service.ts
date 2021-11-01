import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private _socket: Socket) {}

  // Create a manual socket connection
  connect(firmId: number, accessTokenValue: string): void {
    this._socket.ioSocket.auth = { token: accessTokenValue };
    this._socket.ioSocket.nsp = `/firm-${firmId}`;
    this._socket.connect();
    this._socket.on('connect_error', (error)=> {
      console.log(error);
    });
  }

  disconnect(): void {
    this._socket.disconnect();
  }

  test(): void {
    this._socket.emit('test', {msg: 'hello world'})
  }

//   http(method: string, url: string, name: string, data: any) {
//       this._socket.emit('request', {method, url, name, data});
//   }

  // Sync entity data to other sockets on namespace
  addOneToCacheSync(name: string, data: any) {
    this._socket.emit('add', {name, data});
  }

  updateCacheSync(name: string, data: any) {
    this._socket.emit('update', {name, data});
  }

  deleteCacheSync(name: string, data: any) {
    this._socket.emit('delete', {name, data});
  }
  on(event: string, callback: Function) {
      return this._socket.on(event, callback);
  }

  isSocketConnected(): boolean {
    return this._socket.ioSocket.connected;
  }
}
