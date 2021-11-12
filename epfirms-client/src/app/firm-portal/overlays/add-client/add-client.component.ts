import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { Client } from '@app/core/interfaces/client';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  @ViewChild('overlay') overlay;

  @ViewChild('modal') modal;

  clientForm: FormGroup;

  constructor(private _fb: FormBuilder, private _clientService: ClientService, private _dialogRef: DialogRef) { }

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

  submit() {
    this._clientService.createClient(this.clientForm.value).subscribe(response => {
      this.close(response);
    });
  }

  close(newClient?: Client) {
    this._dialogRef.close(newClient);
  }
}
