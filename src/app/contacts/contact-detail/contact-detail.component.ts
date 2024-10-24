import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css',
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  contactId: string;

  constructor(private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.contactId = params['id'];
        this.contact = this.contactService.getContact(this.contactId);
      });
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }
}
