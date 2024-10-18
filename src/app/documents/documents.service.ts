import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model'
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }
  getDocument(id: string) {
    for (const doc of this.documents) {
      if (doc.id = id) {
        return doc;
      }
    }
    return null;
  }

  documentSelectedEvent = new EventEmitter<Document>();

}
