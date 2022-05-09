import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { USAState } from '@app/shared/utils/us-states/typings';

@Component({
  selector: 'app-personal-representative-information',
  templateUrl: './personal-representative-information.component.html',
  styleUrls: ['./personal-representative-information.component.scss'],
})
export class PersonalRepresentativeInformationComponent implements OnInit {
  @Input() matter: Matter;

  // don't forget that this is used in the Probate workflow
  // this means that the client is the personal representative working on behalf of the deceased

  client;

  // client form
  clientForm = {
    id: undefined,
    first_name: '',
    last_name: '',
    email: null,
    phone: '',
    cell_phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    dob: new Date(),
    ssn: '',
    drivers_id: '',
  };

  usaStates: USAState[] = usaStatesFull;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClientData();
  }

  private loadClientData(): void {
    this.client = this.matter.client;
    console.log('client', this.client);

    this.clientForm.id = this.client.id;
    this.clientForm.first_name = this.client.first_name;
    this.clientForm.last_name = this.client.last_name;
    this.clientForm.email = this.client.email;
    this.clientForm.phone = this.client.phone;
    this.clientForm.cell_phone = this.client.cell_phone;
    this.clientForm.address = this.client.address;
    this.clientForm.city = this.client.city;
    this.clientForm.state = this.client.state;
    this.clientForm.zip = this.client.zip;
    this.clientForm.dob = this.client.dob;
    this.clientForm.ssn = this.client.ssn;
    this.clientForm.drivers_id = this.client.drivers_id;
  }

  submit(): void {
    console.log('submit', this.clientForm);
    this.clientService.updateClient(this.clientForm).subscribe((data) => {
      console.log('data', data);
    });
  }
}
