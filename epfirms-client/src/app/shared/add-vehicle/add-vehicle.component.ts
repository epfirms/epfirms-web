import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssetService } from '@app/client-portal/_services/asset-service/asset.service';
import { ModalRef } from '@app/modal/modal-ref';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  vehicleForm: FormGroup;

  constructor(private _fb: FormBuilder, private _assetService: AssetService, private _modalRef: ModalRef) { }

  ngOnInit(): void {
    this.vehicleForm = this._fb.group({
      vehicle_type: ['', [Validators.required]],
      loan_amount: [null, [Validators.required]],
      total_value: [null, [Validators.required]],
    });
  }

  submit() {
    this._assetService.addVehicle(this.vehicleForm.value).subscribe(res => {
      this.close(res);
    });
  }

  close(newVehicle?: any) {
    this._modalRef.close(newVehicle);
  }
}
