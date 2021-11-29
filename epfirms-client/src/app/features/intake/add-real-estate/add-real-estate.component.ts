import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AssetService } from '@app/client-portal/_services/asset-service/asset.service';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-add-real-estate',
  templateUrl: './add-real-estate.component.html',
  styleUrls: ['./add-real-estate.component.scss']
})
export class AddRealEstateComponent implements OnInit {
  realEstateForm: FormGroup;

  constructor(private _fb: FormBuilder, private _assetService: AssetService, private _dialogRef: DialogRef) { }

  ngOnInit(): void {
    this.realEstateForm = this._fb.group({
      full_address: ['', [Validators.required]],
      loan_amount: [null, [Validators.required]],
      total_value: [null, [Validators.required]],
    });

    if (this._dialogRef.data.asset) {
      this.realEstateForm.addControl('id', new FormControl(''));
      this.realEstateForm.patchValue(this._dialogRef.data.asset);
      this.realEstateForm.updateValueAndValidity();
    }
  }

  submit() {
    this.close(this.realEstateForm.value);
  }

  close(newRealEstate?: any) {
    this._dialogRef.close(newRealEstate);
  }
}
