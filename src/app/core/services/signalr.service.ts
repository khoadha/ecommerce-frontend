import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection!: HubConnection;
  private messageQueue: { user: string; message: string }[] = [];
  private connectionPromise: Promise<void> | null = null;

  constructor() {
    this.startConnection();
  }

  private startConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44343/chat')
      .build();

    this.connectionPromise = this.hubConnection
      .start()
      .then(() => {
        this.sendQueuedMessages();
      })
      .catch((err: any) => {
        console.error('Error while starting connection: ' + err);
      });
  };

  private sendQueuedMessages = () => {
    if (this.connectionPromise) {
      this.connectionPromise.then(() => {
        while (this.messageQueue.length > 0) {
          const message = this.messageQueue.shift();
          if (message) {
            this.sendMessage(message.user, message.message);
          }
        }
      });
    }
  };

  public addReceiveMessageListener = (
    callback: (user: string, message: string) => void
  ) => {
    this.hubConnection.on('ReceiveMessage', callback);
  };

  public sendMessage = (user: string, message: string) => {
    if (this.hubConnection.state === 'Connected') {
      this.hubConnection
        .invoke('SendMessage', user, message)
        .catch((err:any) => console.error(err));
    } else {
      this.messageQueue.push({ user, message });
    }
  };
}
