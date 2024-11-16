import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './MessageModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[] = [];
  maxMessageId: number;
  messageChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient) {
    this.maxMessageId = this.getMaxId();
  }
  
  getMessages() {
    this.http.get<Message[]>('https://wdd430-cms-c8c7c-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          
          // Sort messages by id
          this.messages.sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            return 0;
          });
          
          this.messageListChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getMessage(id: string) {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeMessages() {
    const messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put(
      'https://wdd430-cms-c8c7c-default-rtdb.firebaseio.com/documents.json',
      messages,
      { headers: headers }
    ).subscribe(() => {
      this.messageListChangedEvent.next(this.messages.slice());
    });
  }
}
