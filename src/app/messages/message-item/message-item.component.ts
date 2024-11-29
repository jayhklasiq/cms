import { Component, Input, OnInit } from '@angular/core';
import { Message } from "../MessageModel"
import { MessagesService } from '../messages.service';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private messageService: MessagesService, private contactService: ContactService) { }
  async ngOnInit() {
    const contact: Contact = await this.contactService.getContact(this.message.id);
    this.messageSender = contact.name;
  }

}
