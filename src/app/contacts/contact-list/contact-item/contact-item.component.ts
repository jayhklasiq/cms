import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Contact } from '../../contact.model';
import { ContactService } from '../../contact.service';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css',
})
export class ContactItemComponent {
  @Input() contact: Contact;
  constructor(private contactService: ContactService) {
  }

  onSelectedContact(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact)
  }
}
