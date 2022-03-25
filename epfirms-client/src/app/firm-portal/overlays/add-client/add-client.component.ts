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
  user;

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

  phoneInputMask = createMask({
    mask: '(999) 999-9999',
    placeholder: ' ',
    parser: (value: string) => {
      const val = '+1' + value.replaceAll(/\(|\)|\-|\s/g, '');
      return val;
    },
  });

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
    if (this.user) {
      this.clientForm.addControl('id', new FormControl('', Validators.required));
      this.clientForm.patchValue({
        id: this.user.id,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        phone: this.user.phone,
        email: this.user.email,
        address: this.user.address,
        city: this.user.city,
        state: this.user.state,
        zip: this.user.zip,
      });
      this.clientForm.updateValueAndValidity();
    }
  }
}
