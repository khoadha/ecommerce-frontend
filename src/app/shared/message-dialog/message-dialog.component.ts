import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Message } from 'src/app/core/models/message';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css'],
})
export class MessageDialogComponent implements OnInit {
  @Input() messages: Message[] = [];
  @Input() toImg: string = '';
  @Input() toName: string = '';
  @ViewChild('chatBox') private chatBox!: ElementRef;
  myAva: string = '';
  myName: string = '';
  currentUser: string = '';

  constructor(
    public chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getEmailFromToken();
    this.myAva = this.authService.getImgPathFromToken();
    this.myName = this.authService.getUsernameFromToken();
  }
}
