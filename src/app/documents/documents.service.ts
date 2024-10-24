import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model'

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[] = [];

  documentChangedEvent = new EventEmitter<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string) {
    for (const doc of this.documents) {
      if (id === doc.id) {
        return doc;
      }
    }
    return null;
  }

  
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }

  documentSelectedEvent = new EventEmitter<Document>();

}
