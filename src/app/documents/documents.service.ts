import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from './document.model'

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[] = [];
  maxDocumentId: number;

  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    return this.http.get<Document[]>('https://wdd430-cms-c8c7c-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        // success method
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();

          // Sort documents by name
          this.documents.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

          // Emit the sorted list
          this.documentListChangedEvent.next(this.documents.slice());
        },
        // error method
        (error: any) => {
          console.log(error);
        }
      );
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
    this.storeDocuments();
  }

  documentSelectedEvent = new EventEmitter<Document>();


  getMaxId(): number {
    let maxId = 0;

    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  storeDocuments() {
    const documents = JSON.stringify(this.documents);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put(
      'https://wdd430-cms-c8c7c-default-rtdb.firebaseio.com/documents.json',
      documents,
      { headers: headers }
    ).subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }

}
