import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-add-money-account',
  templateUrl: './add-money-account.component.html',
  styleUrls: ['./add-money-account.component.scss']
})
export class AddMoneyAccountComponent implements OnInit {
  accountForm: FormGroup;
  typeOptions = [
    'checking',
    'savings',
    'investment',
    'IRA/401k',
    'money market',
    'checking/savings',
    'other'
  ]
  constructor(private _fb: FormBuilder, private _dialogRef: DialogRef) { }

  ngOnInit(): void {
    this.accountForm = this._fb.group({
      institution: ['', [Validators.required]],
      balance: [null, [Validators.required]],
      type: ['', [Validators.required]],
      is_joint: [false, [Validators.required]]
    });

    if (this._dialogRef.data.asset) {
      this.accountForm.addControl('id', new FormControl(''));
      this.accountForm.patchValue(this._dialogRef.data.asset);
      this.accountForm.updateValueAndValidity();
    }
  }

  submit() {
    this.close(this.accountForm.value);
  }

  close(newAccount?: any) {
    this._dialogRef.close(newAccount);
  }

  setAccountType(type: string): void {
    this.accountForm.patchValue({type});
    this.accountForm.updateValueAndValidity();
  }
}
