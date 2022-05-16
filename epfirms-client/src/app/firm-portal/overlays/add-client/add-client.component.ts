import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '@app/features/user/directives/async-email-validator';
import { PhoneValidator } from '@app/features/user/directives/async-phone-validator.directive';
import { UserService } from '@app/features/user/services/user.service';
import { EpModalRef } from '@app/shared/modal/modal-ref';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { USAState } from '@app/shared/utils/us-states/typings';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  user;

  title: 'Add' | 'Edit' = 'Add';

  clientForm: FormGroup = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    phone: new FormControl(null, [], PhoneValidator.createValidator(this.userService, 'FIXED_LINE')),
    cell_phone: new FormControl(null, [], PhoneValidator.createValidator(this.userService, 'MOBILE')),
    email: new FormControl(
      null,
      Validators.email
    ),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
  });

  phoneInputMask = createMask({
    mask: '(999) 999-9999',
    placeholder: ' ',
    prefix: '+1',
    onBeforeMask: (value: string) => {
      const val = value.slice(2);
      return val;
    },
    parser: (value: string) => {
      const val = '+1' + value.replaceAll(/\(|\)|\-|\s/g, '');
      return val;
    },
  });

  public usaStates: USAState[] = usaStatesFull;

  emailValidator: AsyncValidatorFn;

  constructor(private _modalRef: EpModalRef, private userService: UserService) {}

  ngOnInit(): void {
    this.clientForm.statusChanges.subscribe(() => {
      const config = this._modalRef.getConfig();
      this._modalRef.updateConfig({
        ...config,
        epOkDisabled: this.clientForm.invalid || !this.clientForm.dirty,
      });
    });

    if (this.user) {
      this.editFormInit();
      this.emailValidator = EmailValidator.createValidator(this.userService, this.user.email);
    } else {
      this.emailValidator = EmailValidator.createValidator(this.userService);
    }

    this.clientForm.get('email').addAsyncValidators(this.emailValidator);
  }

  editFormInit() {
    this.title = 'Edit';
    this.clientForm.addControl('id', new FormControl('', Validators.required));

    if (this.user.verified) {
      this.clientForm.get('email').disable();
    }

    this.clientForm.patchValue({
      id: this.user.id,
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      cell_phone: this.user.cell_phone ? this.user.cell_phone : null,
      phone: this.user.phone ? this.user.phone : null,
      email: this.user.email,
      address: this.user.address,
      city: this.user.city,
      state: this.user.state,
      zip: this.user.zip,
    });

    this.clientForm.updateValueAndValidity();
  }
}
