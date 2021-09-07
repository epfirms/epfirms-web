import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { OverlayService } from '@app/firm-portal/_services/overlay-service/overlay.service';
import { ModalRef } from '@app/modal/modal-ref';
import { Client } from '@app/_models/client';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  @ViewChild('overlay') overlay;

  @ViewChild('modal') modal;

  clientForm: FormGroup;

  constructor(private _overlayService: OverlayService, private _fb: FormBuilder, private _clientService: ClientService, private _modalRef: ModalRef) { }

  ngOnInit(): void {
    this.clientForm = this._fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: [null, [Validators.email]],
      address: [null],
      city: [null],
      state: [null],
      zip: [null]
    });
  }

  submit() {
    this._clientService.createClient(this.clientForm.value).subscribe(response => {
      response.pipe(take(1)).subscribe(client => {
        this.close(client);
      });
    });
  }

  close(newClient?: Client) {
    this._modalRef.close(newClient);
  }
}
