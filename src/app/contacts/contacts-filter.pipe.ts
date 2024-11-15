import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): Contact[] {
    const filteredContacts: Contact[] = [];

    if (!contacts || !term) {
      return contacts;
    }

    const termLower = term.toLowerCase();

    for (const contact of contacts) {
      if (contact.name.toLowerCase().includes(termLower)) {
        filteredContacts.push(contact);
      }
    }

    if (filteredContacts.length === 0) {
      return contacts;
    }

    return filteredContacts;
  }

}