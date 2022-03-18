import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EpModalRef } from '@app/shared/modal/modal-ref';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { USAState } from '@app/shared/utils/us-states/typings';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent implements OnInit {
  phoneInputMask = createMask('(999) 999-9999');

  clientForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    phone: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
  });

  user;

  public usaStates: USAState[] = usaStatesFull;

  constructor(private _modalRef: EpModalRef) {}

  ngOnInit(): void {
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
    this.clientForm.statusChanges.subscribe(() => {
      const config =this._modalRef.getConfig();
      this._modalRef.updateConfig({
        ...config,
        epOkDisabled: (this.clientForm.invalid || !this.clientForm.dirty)
      });
    });
  }
}
