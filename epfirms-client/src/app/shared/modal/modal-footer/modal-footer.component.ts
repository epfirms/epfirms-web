import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EpModalRef } from '../modal-ref';
import { ModalOptions } from '../modal-types';

@Component({
  selector: 'div[ep-modal-footer]',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss']
})
export class ModalFooterComponent {
  buttonsFooter = false;

  @Output() readonly cancelTriggered = new EventEmitter<void>();

  @Output() readonly okTriggered = new EventEmitter<void>();

  @Input() modalRef!: EpModalRef;

  constructor(public config: ModalOptions) {
    console.log(config);
  }

  onCancel(): void {
    this.cancelTriggered.emit();
  }

  onOk(): void {
    this.okTriggered.emit();
  }
}