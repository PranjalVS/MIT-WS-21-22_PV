import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket: Socket;
  msgtext: string;

  constructor() { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('message', 'Hello there from Angular.'); // take care of the message name
    this.socket.on('message', (msgt: string) => {
      console.log(msgt);
      this.msgtext = msgt;
    })
    return this.socket;
  }

  lastmessage() {
    return this.msgtext;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
