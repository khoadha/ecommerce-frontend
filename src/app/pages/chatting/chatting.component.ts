import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserList } from 'src/app/core/models/message';
import { Profile } from 'src/app/core/models/profile';
@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css'],
})
export class ChattingComponent implements OnInit, OnDestroy {
  profile!: Profile;
  searchQuery = '';
  toUser: string = '';
  toName: string = '';
  myEmail: string = this.authService.getEmailFromToken();
  // toName: string = 'a';
  toImg: string = '';
  userList: UserList[] = [];
  private userConnectedSubscription?: Subscription;
  private userListFetchedSubscription?: Subscription;
  constructor(
    public chatService: ChatService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.chatService.stopChatConnnection();
  }

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    this.searchQuery = params['q'] ?? '';
    this.chatService.createChatConnection();
    this.registerUser();
    this.userConnectedSubscription = this.chatService
      .onUserConnected()
      .subscribe(() => {
        if (this.searchQuery != '') {
          this.toUser = this.searchQuery;
          this.openPrivateChat(this.searchQuery, this.toName, this.toImg);
          this.userListFetchedSubscription = this.chatService
            .onUserListFetch()
            .subscribe((onlineUsers: UserList[]) => {
              this.userList = onlineUsers;

              if (this.searchQuery !== '') {
                this.userService
                  .getProfileByEmail(this.searchQuery)
                  .subscribe((res) => {
                    this.profile = res;
                    const userExists = this.userList.find(
                      (user) => user.email === this.searchQuery
                    );
                    if (!userExists) {
                      let newUser: UserList = {
                        email: this.searchQuery,
                        username: this.profile.userName,
                        imgPath: this.profile.imgPath,
                        lastMessage: 'Draft',
                        currentUser: this.myEmail,
                      };
                      this.toName = newUser.username;
                      this.userList.unshift(newUser);
                    }
                  });
              }
            });
        } else {
          this.userListFetchedSubscription = this.chatService
            .onUserListFetch()
            .subscribe((onlineUsers: UserList[]) => {
              if (this.myEmail == onlineUsers[0].currentUser) {
                this.userList = onlineUsers;
                if (this.toUser == '' /*&& this.searchQuery != ''*/) {
                  this.toUser = this.chatService.onlineUsers[0].email;
                  this.toImg = this.chatService.onlineUsers[0].imgPath;
                  this.toName = this.chatService.onlineUsers[0].username;
                  this.openPrivateChat(this.toUser, this.toName, this.toImg);
                }
              }
            });
        }
      });
  }
  user: User = {
    id: this.authService.getUserIdFromToken(),
    userName: this.authService.getUsernameFromToken(),
    email: this.authService.getEmailFromToken(),
    phoneNumber: this.authService.getPhoneNumerFromToken(),
    managedStoreId: 0,
    lastLoginTime: undefined,
  };
  registerUser() {
    this.chatService.registerUser(this.user).subscribe({
      next: () => {},
    });
  }

  sendMessage(content: string) {
    this.chatService.sendPrivateMessage(this.myEmail, this.toUser, content);
  }

  async openPrivateChat(toUser: string, toName: string, toImg: string) {
    this.toName = toName;
    this.toImg = toImg;
    if (!this.toUser || this.toUser.trim() === '' || toUser === this.toUser) {
      await this.chatService.addUserConnectionId();
      await this.chatService.createPrivateChat(toUser, '');
      this.toUser = toUser;
    } else {
      await this.chatService.closePrivateChat(toUser);
      console.log('close');
      this.toUser = toUser;

      this.openPrivateChat(toUser, toName, toImg);
    }
  }
}
