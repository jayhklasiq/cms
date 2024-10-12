import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { Contact } from '../contact.model';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent {
  contacts: Contact[] = [
    new Contact(
      1,
      'R. Kent Jackson',
      'jacksonk@byui.edu',
      '208-496-3771',
      '/jacksonk.jpg'
    ),
    new Contact(
      2,
      'Rex Barzee',
      'barzeer@byui.edu',
      '208-496-3768',
      '/barzeer.jpg'
    ),
  ];

  @Output() fetchedContact = new EventEmitter<Contact>();

  updateFetchedContact(selectedContactFromList: Contact) {
    this.fetchedContact.emit(selectedContactFromList);
  }
}
