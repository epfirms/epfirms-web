import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { Client } from '@app/core/interfaces/client';
import { take } from 'rxjs/operators';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent {
  @ViewChild('overlay') overlay;

  @ViewChild('modal') modal;

  clientForm: FormGroup;

  constructor(private _fb: FormBuilder, private _clientService: ClientService, private _dialogRef: DialogRef) {
    this.clientForm = this._fb.group({
      id: [_dialogRef.data.user.id, [Validators.required]],
      first_name: [_dialogRef.data.user.first_name, [Validators.required]],
      last_name: [_dialogRef.data.user.last_name, [Validators.required]],
      phone: [_dialogRef.data.user.phone],
      email: [_dialogRef.data.user.email, [Validators.email]],
      address: [_dialogRef.data.user.address],
      city: [_dialogRef.data.user.city],
      state: [_dialogRef.data.user.state],
      zip: [_dialogRef.data.user.zip]
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
    this._dialogRef.close(newClient);
  }
}
