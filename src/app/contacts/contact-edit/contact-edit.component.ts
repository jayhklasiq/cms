import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent {
  newContact: Contact = new Contact('', '', '', '', '', null); // Initialize a new contact

  constructor(private contactService: ContactService) {}

  onSave() {
    this.contactService.addContact(this.newContact); // Call the addContact method
    this.newContact = new Contact('', '', '', '', '', null); // Reset the form after saving
  }
}
