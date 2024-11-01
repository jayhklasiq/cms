import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number; // To keep track of the maximum ID

  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId(); // Initialize maxContactId
  }

  getContacts(): Contact[] {
    return this.contacts.slice(); 
  }

  getContact(id: string): Contact { 
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact; 
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId++; // Increment maxContactId
    newContact.id = this.maxContactId.toString(); // Assign new ID
    this.contacts.push(newContact); // Add new contact to the list
    const contactsListClone = this.contacts.slice(); // Clone the updated list
    this.contactListChangedEvent.next(contactsListClone); // Emit the updated list
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id; // Keep the original ID
    this.contacts[pos] = newContact; // Update the contact in the list
    const contactsListClone = this.contacts.slice(); // Clone the updated list
    this.contactListChangedEvent.next(contactsListClone); // Emit the updated list
  }

  contactSelectedEvent = new EventEmitter<Contact>();

  private getMaxId(): number {
    let maxId = 0;

    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }
}
