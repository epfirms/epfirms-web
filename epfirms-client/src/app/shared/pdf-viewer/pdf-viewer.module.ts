import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerComponent } from './pdf-viewer.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';



@NgModule({
  declarations: [
    PdfViewerComponent
  ],
  imports: [
    CommonModule,
    PdfJsViewerModule
  ],
  exports: [
    PdfViewerComponent
  ]
})
export class PdfViewerModule { }
