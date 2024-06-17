import { Injectable } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { io, Socket } from 'socket.io-client';
import { environment } from "../../environments/environment";

@Injectable({

 providedIn: 'root',

})

export class WebSocketService {

  private socket: Socket;

  constructor() {
    this.socket = io(`ws://localhost:3001`);
  }

  public sendMessage(event: string, data?: any): void {
    if (data) {
      this.socket.emit(event, data);
      return;
    }

    this.socket.emit(event);
    return;
  }

  public getMessage(event: string): Observable<any> {
    return fromEvent(this.socket, event).pipe(map((data: any) => data));
  }

  public removeListenerMessage(event: string): any {
    this.socket.removeListener(event);
  }

  public connect(): void {
    this.socket.on('connect', () => {
      if (!environment.production) {
        console.log('Conexión con Backend');
      }
    });

    this.socket.on('connect_error', (error) => {
      console.log('No se pudo conectar al Backend');
      console.log(error);
    });
  }
}
