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
  messageSelectedEvent = new EventEmitter<Message>();

  constructor(private http: HttpClient) {
    this.maxMessageId = this.getMaxId();
  }

  getMessages(): void {
    this.http.get<Message[]>('http://localhost:3000/api/messages')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.sortAndSend(); // Sort and emit the updated list
          console.log('Logging out Messages...');
          console.log(this.messages);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getMessage(id: string): Promise<Message | null> {
    return this.http.get<Message>('http://localhost:3000/api/messages/' + id)
      .toPromise()
      .then(message => {
        this.messageSelectedEvent.emit(message);
        return message;
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    if (!newMessage.id) {
      this.maxMessageId++;
      newMessage.id = this.maxMessageId.toString();
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: Message }>('http://localhost:3000/api/messages', newMessage, { headers: headers })
      .subscribe(responseData => {
        this.messages.push(responseData.message);
        this.sortAndSend(); // Emit the updated list
      }, error => {
        console.error('Error adding message:', error);
      });
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex(m => m.id === originalMessage.id);
    if (pos < 0) {
      return;
    }

    newMessage.id = originalMessage.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('http://localhost:3000/api/messages/' + originalMessage.id, newMessage, { headers: headers })
      .subscribe(() => {
        this.messages[pos] = newMessage;
        this.sortAndSend(); // Emit the updated list
      });
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }

    const pos = this.messages.findIndex(m => m.id === message.id);
    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/api/messages/' + message.id)
      .subscribe(() => {
        this.messages.splice(pos, 1);
        this.sortAndSend(); // Emit the updated list
      });
  }

  private getMaxId(): number {
    let maxId = 0;

    for (const message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  private sortAndSend() {
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
  }
}
