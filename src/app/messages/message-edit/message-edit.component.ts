import { Component, ViewChild, ElementRef, EventEmitter, Output, OnInit } from '@angular/core';
import { Message as MessageModel } from "../MessageModel";
import { MessagesService } from '../messages.service';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

// Define the Message interface
interface Message extends MessageModel {
  id: string;
  subject: string;
  msgText: string;
  sender: string;
}

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectInput!: ElementRef;
  @ViewChild('msgText') msgTextInput!: ElementRef;

  messageList: Message[] = [];
  contact: Contact;
  currentSender: string;
  currentSenderID: string;
  newMessage: Message;
  constructor(private messageService: MessagesService, private contactService: ContactService) {
  }


  onSendMessage(event: Event) {
    event.preventDefault();
    const subject = this.subjectInput.nativeElement.value;
    const msgText = this.msgTextInput.nativeElement.value;

    this.newMessage = {
      id: this.currentSenderID,
      subject: subject,
      msgText: msgText,
      sender: this.currentSender
    };
    console.log(this.newMessage);
    this.messageService.addMessage(this.newMessage);
    this.onClear();
  }

  async ngOnInit() {
    this.contact = await this.contactService.getContact("101");
    console.log(this.contact);
    this.currentSender = this.contact.name;
    this.currentSenderID = this.contact.id;
  }

  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.msgTextInput.nativeElement.value = '';
  }
}
