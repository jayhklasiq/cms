import { Component, Input } from '@angular/core';
import { Document } from '../../document.model';
import { DocumentsService } from '../../documents.service';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent {
  @Input() document!: Document;

  constructor(private documentService: DocumentsService) { }

  onSelectedDocument(docs: Document) {
    this.documentService.documentSelectedEvent.emit(docs);
  }

}
