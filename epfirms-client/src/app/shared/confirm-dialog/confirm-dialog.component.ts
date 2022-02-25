import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EpModalRef } from '../modal/modal-ref';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  host: {
    'class': 'flex flex-col flex-auto'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
  title: string = '';

  body: string = '';

  constructor(public _modalRef: EpModalRef) { }
}
