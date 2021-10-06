import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { OverlayService } from '@app/firm-portal/_services/overlay-service/overlay.service';
import { ModalRef } from '@app/modal/modal-ref';
import { Client } from '@app/_models/client';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent {
  @ViewChild('overlay') overlay;

  @ViewChild('modal') modal;

  clientForm: FormGroup;

  constructor(private _overlayService: OverlayService, private _fb: FormBuilder, private _clientService: ClientService, private _modalRef: ModalRef) {
    this.clientForm = this._fb.group({
      id: [_modalRef.data.user.id, [Validators.required]],
      first_name: [_modalRef.data.user.first_name, [Validators.required]],
      last_name: [_modalRef.data.user.last_name, [Validators.required]],
      phone: [_modalRef.data.user.phone],
      email: [_modalRef.data.user.email, [Validators.email]],
      address: [_modalRef.data.user.address],
      city: [_modalRef.data.user.city],
      state: [_modalRef.data.user.state],
      zip: [_modalRef.data.user.zip]
    });
  }

  submit() {
    this._clientService.updateClient(this.clientForm.value).subscribe(response => {
      response.pipe(take(1)).subscribe(client => {
        this.close(client);
      });
    })
  }

  close(newClient?: Client) {
    this._modalRef.close(newClient);
  }
}
