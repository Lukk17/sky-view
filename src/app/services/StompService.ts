import {Injectable} from '@angular/core';
import {Client, IMessage, Stomp, StompConfig} from '@stomp/stompjs';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StompService {
  private client: Client;
  private messages: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() {
    this.client = Stomp.over(new WebSocket('ws://localhost:5554/notifyWebsocket'));

    this.client.onConnect = () => {
      this.client.subscribe('/sky/notify', (message: IMessage) => {
        this.messages.next(message.body);
      });
    };

    this.client.onStompError = (frame) => {
      console.error(`Error: ${frame.headers['message']}`);
    };

    this.client.activate();
  }

  sendMessage(message: string): void {
    this.client.publish({destination: '/sky/notify', body: message});
  }

  getMessages(): Observable<string> {
    return this.messages.asObservable();
  }
}
