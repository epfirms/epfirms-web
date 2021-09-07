import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssetService } from '@app/client-portal/_services/asset-service/asset.service';
import { ModalRef } from '@app/modal/modal-ref';

@Component({
  selector: 'app-add-real-estate',
  templateUrl: './add-real-estate.component.html',
  styleUrls: ['./add-real-estate.component.scss']
})
export class AddRealEstateComponent implements OnInit {
  realEstateForm: FormGroup;

  constructor(private _fb: FormBuilder, private _assetService: AssetService, private _modalRef: ModalRef) { }

  ngOnInit(): void {
    this.realEstateForm = this._fb.group({
      full_address: ['', [Validators.required]],
      loan_amount: [null, [Validators.required]],
      total_value: [null, [Validators.required]],
    });
  }

  submit() {
    this._assetService.addRealEstate(this.realEstateForm.value).subscribe(res => {
      this.close(res);
    });
  }

  close(newRealEstate?: any) {
    this._modalRef.close(newRealEstate);
  }
}
