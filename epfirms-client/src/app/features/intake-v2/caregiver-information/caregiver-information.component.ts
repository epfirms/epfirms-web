import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';
import { UserService } from '@app/features/user/services/user.service';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { USAState } from '@app/shared/utils/us-states/typings';

@Component({
  selector: 'app-caregiver-information',
  templateUrl: './caregiver-information.component.html',
  styleUrls: ['./caregiver-information.component.scss']
})
export class CaregiverInformationComponent implements OnInit {
  @Input() matter: Matter;

  // don't forget that this is used in the elder law workflow
  // this means that the client is the Caregiver working on behalf of a ward

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadClientData();
  }

  private loadClientData(): void {
    this.userService.get(this.matter.client_id).subscribe((data) => {
      console.log('user', data);
      if (data) {
        this.client = data;
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
    });
  }

  submit(): void {
    console.log('submit', this.clientForm);
    this.userService.upsert(this.clientForm).subscribe((data) => {
      console.log('data', data);
    });
  }
}
