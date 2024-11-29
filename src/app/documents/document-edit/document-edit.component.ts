import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {


  constructor(
    private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }

        this.documentService.getDocument(id).then(document => {
          this.originalDocument = document;
          if (!this.originalDocument) {
            return;
          }
          this.editMode = true;
          this.document = { ...this.originalDocument };
        });

        this.editMode = true;
        this.document = { ...this.originalDocument };
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(form.value)
    const newDocument = new Document(
      '',
      value.name,
      value.url,
      value.children = null
    );

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
