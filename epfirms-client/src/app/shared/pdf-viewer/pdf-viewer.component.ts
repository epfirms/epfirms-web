import { Component, Input, OnInit } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
  host: {
    'class': 'h-full flex flex-col'
  }
})
export class PdfViewerComponent {
  set pdfSrc(src: string) {
    this._src = src;
  };
  get pdfSrc() {
    return this._src;
  }

  private _src: string;

  downloadPdf: boolean = false;

  constructor(private _dialogRef: DialogRef) {
    this.pdfSrc = _dialogRef.data.src;
  }

  close(): void {
    this._dialogRef.close();
  }
}
