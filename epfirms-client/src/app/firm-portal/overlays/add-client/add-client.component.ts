import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EpModalRef } from '@app/shared/modal/modal-ref';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup;

  constructor(private _fb: FormBuilder, private _modalRef: EpModalRef) { }

  ngOnInit(): void {
    this.clientForm = this._fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone: [''],
      email: [null, [Validators.email]],
      address: [null],
      city: [null],
      state: [null],
      zip: [null]
    });
  }
}
