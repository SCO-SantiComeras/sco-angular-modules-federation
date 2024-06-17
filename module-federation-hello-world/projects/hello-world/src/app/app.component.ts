import { Component } from '@angular/core';
import { WebSocketService } from './websocket/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  constructor(private readonly websocketService: WebSocketService) {
    this.websocketService.connect();
  }
}
