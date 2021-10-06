import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetService } from '@app/client-portal/_services/asset-service/asset.service';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { OverlayService } from '@app/firm-portal/_services/overlay-service/overlay.service';
import { ModalRef } from '@app/modal/modal-ref';
import { Client } from '@app/_models/client';
import { take } from 'rxjs/operators';

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
    'other'
  ]
  constructor(private _fb: FormBuilder, private _assetService: AssetService, private _modalRef: ModalRef) { }

  ngOnInit(): void {
    this.accountForm = this._fb.group({
      institution: ['', [Validators.required]],
      balance: [null, [Validators.required]],
      type: ['', [Validators.required]],
      is_joint: [false, [Validators.required]]
    });

    if (this._modalRef.data.asset) {
      this.accountForm.addControl('id', new FormControl(''));
      this.accountForm.patchValue(this._modalRef.data.asset);
      this.accountForm.updateValueAndValidity();
    }
  }

  submit() {
    this.close(this.accountForm.value);
  }

  close(newAccount?: any) {
    this._modalRef.close(newAccount);
  }

  setAccountType(type: string): void {
    this.accountForm.patchValue({type});
    this.accountForm.updateValueAndValidity();
  }
}
