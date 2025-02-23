import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AssetService } from '@app/client-portal/_services/asset-service/asset.service';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  vehicleForm: FormGroup;

  constructor(private _fb: FormBuilder, private _assetService: AssetService, private _dialogRef: DialogRef) { }

  ngOnInit(): void {
    this.vehicleForm = this._fb.group({
      vehicle_type: ['', [Validators.required]],
      loan_amount: [null, [Validators.required]],
      total_value: [null, [Validators.required]],
    });

    if (this._dialogRef.data.asset) {
      this.vehicleForm.addControl('id', new FormControl(''));
      this.vehicleForm.patchValue(this._dialogRef.data.asset);
      this.vehicleForm.updateValueAndValidity();
    }
  }

  submit() {
    this.close(this.vehicleForm.value);
  }

  close(newVehicle?: any) {
    this._dialogRef.close(newVehicle);
  }
}
