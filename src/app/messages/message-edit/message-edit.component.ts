import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Message as MessageModel } from "../MessageModel";

// Define the Message interface
interface Message extends MessageModel {
  id: number;
  subject: string;
  msgText: string;
  sender: string;
}

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @ViewChild('subject') subjectInput!: ElementRef;
  @ViewChild('msgText') msgTextInput!: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = 'OwoLabi';
  onSendMessage(event: Event) {
    event.preventDefault();
    const subject = this.subjectInput.nativeElement.value;
    const msgText = this.msgTextInput.nativeElement.value;

    const newMessage: Message = {
      id: 8,
      subject: subject,
      msgText: msgText,
      sender: this.currentSender
    };
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.msgTextInput.nativeElement.value = '';
  }
}
