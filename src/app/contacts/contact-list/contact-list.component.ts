import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  dropTargets: CdkDropList[] = [];
  term: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContacts();
    this.contactService.contactListChangedEvent.subscribe(
      (contactsList: Contact[]) => {
        this.contacts = contactsList;
      }
    );

  }

  addDropTarget(target: CdkDropList) {
    this.dropTargets.push(target);
  }

  search(value: string) {
    this.term = value;
  }
}
