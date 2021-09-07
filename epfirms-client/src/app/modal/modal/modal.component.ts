import { Component, OnInit, TemplateRef, Type } from '@angular/core';
import { ModalRef } from '../modal-ref';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  contentType: 'component';
  content: Type<any>;
  context;

  constructor(private ref: ModalRef) {}

  close() {
    this.ref.close(null);
  }

  ngOnInit() {
    this.content = this.ref.content;

  }
}
