import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from "../MessageModel";
import { MessagesService } from '../messages.service';
import { Subscription } from 'rxjs';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  subscription: Subscription;

  constructor(private messageService: MessagesService, private contactService: ContactService) { }

  ngOnInit() {
    this.messageService.getMessages();
    this.subscription = this.messageService.messageListChangedEvent.subscribe(
      async (messages: Message[]) => {
        this.messages = await Promise.all(messages.map(async message => {
          const contact: Contact | null = await this.contactService.getContact(message.sender);
          if (contact) {
            message.sender = contact.name;
          } else {
            message.sender = 'Unknown Sender';
          }
          return message;
        }));
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
