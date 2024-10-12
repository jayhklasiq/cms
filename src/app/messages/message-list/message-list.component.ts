import { Component } from '@angular/core';
import { Message } from "../MessageModel";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(1, 'Hello', 'How are you?', 'Alice'),
    new Message(2, 'Greetings', 'I am fine, thank you!', 'Bob'),
    new Message(3, 'Question', 'What about you?', 'Alice')
  ];

  onAddMessage(message: Message) {
    const newMessage = new Message((this.messages.length + 1), message.subject, message.msgText, message.sender);
    this.messages.push(newMessage);
  }
}
