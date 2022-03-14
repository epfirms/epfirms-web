import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EpModalRef } from '@app/shared/modal/modal-ref';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { USAState } from '@app/shared/utils/us-states/typings';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    phone: new FormControl(''),
    email: new FormControl(null, Validators.email),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
  });

  phoneInputMask = createMask('(999) 999-9999');
  
  public usaStates: USAState[] = usaStatesFull;

  constructor(private _modalRef: EpModalRef) {}

  ngOnInit(): void {
    this.clientForm.statusChanges.subscribe(() => {
      const config = this._modalRef.getConfig();
      this._modalRef.updateConfig({
        ...config,
        epOkDisabled: this.clientForm.invalid || !this.clientForm.dirty,
      });
    });
  }
}
