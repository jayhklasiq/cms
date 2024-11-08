import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (!this.id) {
          this.editMode = false;
          return;
        }

        this.originalContact = this.contactService.getContact(this.id);
        if (!this.originalContact) {
          return;
        }

        this.editMode = true;
        // Using JSON parse/stringify for deep cloning
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if (this.contact.group) {
          // Using JSON parse/stringify for deep cloning of group contacts
          this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
        }
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      '', // id will be handled by the service
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  onDrop(event: CdkDragDrop<Contact[]>) {
    if (event.previousContainer === event.container) {
      return;
    }

    // Check if contact is already in group
    const contactBeingDropped = event.previousContainer.data[event.previousIndex];
    if (this.groupContacts.some(contact => contact.id === contactBeingDropped.id)) {
      return; // Contact already exists in group
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  onRemoveItem(index: number) {
    if (this.groupContacts) {
      this.groupContacts.splice(index, 1);
    }
  }
}
