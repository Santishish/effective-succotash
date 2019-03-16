import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../_models/message";
import {UserService} from "../../_services/user.service";
import {AuthService} from "../../_services/auth.service";
import {AlertifyService} from "../../_services/alertify.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private userService: UserService,
              private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(tap(messages => {
        for (let message of messages) {
          if (!message.isRead && message.recipientId === currentUserId) {
            this.userService.markAsRead(currentUserId, message.id);
          }
        }
      }))
      .subscribe(messages => this.messages = messages,
        error1 => this.alertify.error(error1));
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe((message: Message) => {
        this.messages.unshift(message);
        this.newMessage = {};
      }, error1 => this.alertify.error(error1));
  }
}
