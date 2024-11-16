import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from "../MessageModel";
import { MessagesService } from '../messages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  subscription: Subscription;

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.messageService.getMessages();
    this.subscription = this.messageService.messageListChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
