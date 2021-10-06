import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { OverlayService } from '@app/firm-portal/_services/overlay-service/overlay.service';
import { ModalRef } from '@app/modal/modal-ref';
import { Client } from '@app/_models/client';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-form-modal',
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.scss']
})
export class UserFormModalComponent implements OnInit {
  @ViewChild('overlay') overlay;

  @ViewChild('modal') modal;

  userForm: FormGroup;

  title: string;

  constructor(private _fb: FormBuilder, private _modalRef: ModalRef) {
    this.title = _modalRef.data.title;
  }

  ngOnInit(): void {
    this.userForm = this._fb.group({
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

  submit() {
    this.close(this.userForm.value);
  }

  close(newClient?: Client) {
    this._modalRef.close(newClient);
  }
}
