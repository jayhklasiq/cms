import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    {
      id: 101,
      title: 'Just Serve',
      description: 'This is a demo document.',
      url: 'http://example.com/just-serve'
    },
    {
      id: 102,
      title: 'Learn Angular',
      description: 'A comprehensive guide to Angular.',
      url: 'http://example.com/learn-angular'
    },
    {
      id: 103,
      title: 'TypeScript Basics',
      description: 'Introduction to TypeScript.',
      url: 'http://example.com/typescript-basics'
    },
    {
      id: 104,
      title: 'Understanding RxJS',
      description: 'Deep dive into RxJS for reactive programming.',
      url: 'http://example.com/understanding-rxjs'
    },
    {
      id: 105,
      title: 'Angular Best Practices',
      description: 'Best practices for Angular development.',
      url: 'http://example.com/angular-best-practices'
    }
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
