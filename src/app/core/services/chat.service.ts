import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { AuthService } from './auth.service';
import { Message, UserList } from '../models/message';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  @ViewChild('chatBox') private chatBox!: ElementRef;
  private chatConnection?: HubConnection;
  readonly baseUrl = environment.baseUrl;
  readonly materialUrl = this.baseUrl;

  myName: string = this.authService.getEmailFromToken();
  myDisplayName: string = this.authService.getUsernameFromToken();
  onlineUsers: UserList[] = [];
  messages: Message[] = [];
  privateMessages: Message[] = [];
  privateMessageInitiated = false;

  private userConnectedSubject = new Subject<void>();
  private userListFetchedSubject = new Subject<UserList[]>();

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  registerUser(user: User) {
    return this.httpClient.post(this.materialUrl + 'register-user', user);
  }

  userConnected() {
    this.userConnectedSubject.next();
  }

  onUserConnected() {
    return this.userConnectedSubject.asObservable();
  }

  onUserListFetch() {
    return this.userListFetchedSubject.asObservable();
  }

  createChatConnection() {
    this.chatConnection = new HubConnectionBuilder()
      .withUrl(environment.hubUrl, {
        headers: {},
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    this.chatConnection.start().catch((err) => {});

    this.chatConnection.on('UserConnected', () => {
      this.addUserConnectionId();
      this.userConnected();
    });

    this.chatConnection.on('OnlineUsers', (onlineUsers: UserList[]) => {
      this.onlineUsers = onlineUsers;
      this.userListFetchedSubject.next(onlineUsers);
    });

    this.chatConnection.on('NewMessage', (newMessage: Message) => {
      this.messages = [...this.messages, newMessage];
    });

    this.chatConnection.on('OpenPrivateChat', (newMessage: Message) => {
      this.privateMessages = [...this.privateMessages, newMessage];
      this.privateMessageInitiated = true;
      this.scrollToBottom();
    });

    this.chatConnection.on('ReceivePrivateMessage', (newMessage: Message) => {
      this.privateMessages = [...this.privateMessages, newMessage];

      this.scrollToBottom();
    });

    this.chatConnection.on('NewPrivateMessage', (newMessage: Message) => {
      this.privateMessages = [...this.privateMessages, newMessage];
      this.scrollToBottom();
    });

    this.chatConnection.on('ClosePrivateMessage', () => {
      this.privateMessageInitiated = false;
      this.privateMessages = [];
    });

    this.chatConnection.on('GetPrivateChatList', (messageDtos: Message[]) => {
      this.privateMessages = [...messageDtos];
    });
  }

  private areUserEqual(list1: UserList[], list2: UserList[]): boolean {
    if (list1.length > 0 && list2.length > 0) {
      if (list1[0].currentUser == list2[0].currentUser) return true;
    }

    return false;
  }
  private areUserListsEqualSameAcc(
    list1: UserList[],
    list2: UserList[]
  ): boolean {
    if (list1.length !== list2.length) return false;
    for (let i = 0; i < list1.length; i++) {
      if (list1[i].lastMessage !== list2[i].lastMessage) return false;
    }
    return true;
  }
  private areUserListsEqualDiffAcc(
    list1: UserList[],
    list2: UserList[]
  ): boolean {
    if (list1.length !== list2.length) return false;
    for (let i = 0; i < list1.length; i++) {
      if (list1[i].lastMessage !== list2[i].lastMessage) return false;
    }
    return true;
  }

  private scrollToBottom(): void {
    try {
      this.chatBox.nativeElement.scrollTop =
        this.chatBox.nativeElement.scrollHeight;
    } catch (err) {}
  }

  stopChatConnnection() {
    this.chatConnection?.stop().catch((err) => {});
  }

  async addUserConnectionId() {
    return this.chatConnection
      ?.invoke('AddUserConnectionId', this.myName)
      .catch((err) => console.log(err));
  }

  async sendMessage(content: string) {
    const message: Message = {
      from: this.myName,
      content,
    };
    return this.chatConnection
      ?.invoke('ReceiveMessage', message)
      .catch((err) => console.log(err));
  }

  async createPrivateChat(toUser: string, content: string) {
    const message: Message = {
      from: this.myName,
      to: toUser,
      content: 'conasdtent',
    };
    return this.chatConnection
      ?.invoke('CreatePrivateChat', message)
      .then(() => {
        // this.privateMessages = [...this.privateMessages, message];
      })
      .catch((err) => console.log(err));
  }
  //bug
  async sendPrivateMessage(myEmail: string, toUser: string, content: string) {
    const message: Message = {
      from: this.myName,
      to: toUser,
      content: content,
      dateTime: new Date(),
    };

    try {
      await this.chatConnection?.invoke('ReceivePrivateMessage', message);
      console.log('not display');
      await this.chatConnection?.invoke('DisplayOnlineUser', myEmail);
      console.log('display' + myEmail);
    } catch (err) {
      console.log(err);
    }
  }

  async closePrivateChat(toUser: string) {
    const message: Message = {
      from: this.myName,
      to: toUser,
      content: '',
    };
    return this.chatConnection
      ?.invoke('RemovePrivateMessage', message)
      .then(() => {
        this.privateMessages = [];
      })
      .catch((err) => console.log(err));
  }
}
