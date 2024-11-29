import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  nativeWindow: any;
  document: Document;
  documentId: string;
  constructor(private documentService: DocumentsService,
    private route: ActivatedRoute,
    private router: Router,
    private windRef: WindRefService) {
    this.nativeWindow = this.windRef.getNativeWindow();
  }

  onView() {
    if (this.document?.url) {
      this.nativeWindow.open(this.document.url);
    }
  }


  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.documentId = params['id'];
        this.documentService.getDocument(this.documentId).then((document: Document) => {
          this.document = document;
        }).catch(() => {
          this.document = {} as Document;
        });
      });
  }
}
