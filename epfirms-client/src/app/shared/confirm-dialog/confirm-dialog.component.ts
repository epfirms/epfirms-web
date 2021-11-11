import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DialogConfig, DialogContentSymbol, DialogRef, DIALOG_CONFIG } from '@ngneat/dialog';

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
  title = this._dialogRef.data[DialogContentSymbol].title;
  body = this._dialogRef.data[DialogContentSymbol].body;
  context = {
    $implicit: this._dialogRef,
    data: this._dialogRef.data
  }
  constructor(public _dialogRef: DialogRef, @Inject(DIALOG_CONFIG) public config: DialogConfig) { }
}
