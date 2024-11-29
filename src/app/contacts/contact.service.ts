import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;

  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();

  constructor(private http: HttpClient) {
    this.contacts = [];
    this.maxContactId = this.getMaxId();
  }

  getContacts(): void {
    this.http.get<Contact[]>('http://localhost:3000/api/contacts')
      .subscribe(
        (contactsList: Contact[]) => {
          this.contacts = contactsList || []; // Ensure contactsList is not null or undefined
          console.log('Logging out Contacts...');
          console.log(this.contacts);
          this.maxContactId = this.getMaxId();
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getContact(id: string): Promise<Contact | null> {
    return this.http.get<Contact>('http://localhost:3000/api/contacts/' + id)
      .toPromise()
      .then(contact => {
        this.contactSelectedEvent.emit(contact);
        return contact;
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) {
      return;
    }
    this.http.delete('http://localhost:3000/api/contacts/' + contact.id)
      .subscribe(() => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      });
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/api/contacts', newContact, { headers: headers })
      .subscribe(responseData => {
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('http://localhost:3000/api/contacts/' + originalContact.id, newContact, { headers: headers })
      .subscribe(() => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      });
  }

  private getMaxId(): number {
    let maxId = 0;

    if (!Array.isArray(this.contacts)) {
      this.contacts = [];
    }

    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  private sortAndSend() {
    this.contacts.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
