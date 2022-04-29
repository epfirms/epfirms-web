import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { AppointeeSummaryService } from '../services/appointee-summary.service';

@Component({
  selector: 'app-appointees',
  templateUrl: './appointees.component.html',
  styleUrls: ['./appointees.component.scss'],
})
export class AppointeesComponent implements OnInit {
  @Input() matter;

  spouse;
  client;

  // this is not the best way to store appointees but this
  // is how it was requested
  // this might need to be changed in the future
  // this will correspond with the AppointeeSummary model in the api and AppointeeSummary Module
  // note that it caps the number of each executor to 4
  // let the programming gods forgive me for this LOL
  clientAppointeeSummary = {
    id: undefined,
    user_id: undefined,
    executor_1_rank: '1',
    executor_1_name: '',
    executor_1_address: '',
    executor_1_phone: '',
    executor_2_rank: '2',
    executor_2_name: '',
    executor_2_address: '',
    executor_2_phone: '',
    executor_3_rank: '3',
    executor_3_name: '',
    executor_3_address: '',
    executor_3_phone: '',
    executor_4_rank: '4',
    executor_4_name: '',
    executor_4_address: '',
    executor_4_phone: '',

    trustee_1_rank: '1',
    trustee_1_name: '',
    trustee_1_address: '',
    trustee_1_phone: '',
    trustee_2_rank: '2',
    trustee_2_name: '',
    trustee_2_address: '',
    trustee_2_phone: '',
    trustee_3_rank: '3',
    trustee_3_name: '',
    trustee_3_address: '',
    trustee_3_phone: '',
    trustee_4_rank: '4',
    trustee_4_name: '',
    trustee_4_address: '',
    trustee_4_phone: '',

    fpoa_1_rank: '1',
    fpoa_1_name: '',
    fpoa_1_address: '',
    fpoa_1_phone: '',
    fpoa_2_rank: '2',
    fpoa_2_name: '',
    fpoa_2_address: '',
    fpoa_2_phone: '',
    fpoa_3_rank: '3',
    fpoa_3_name: '',
    fpoa_3_address: '',
    fpoa_3_phone: '',
    fpoa_4_rank: '4',
    fpoa_4_name: '',
    fpoa_4_address: '',
    fpoa_4_phone: '',

    mpoa_1_rank: '1',
    mpoa_1_name: '',
    mpoa_1_address: '',
    mpoa_1_phone: '',
    mpoa_2_rank: '2',
    mpoa_2_name: '',
    mpoa_2_address: '',
    mpoa_2_phone: '',
    mpoa_3_rank: '3',
    mpoa_3_name: '',
    mpoa_3_address: '',
    mpoa_3_phone: '',
    mpoa_4_rank: '4',
    mpoa_4_name: '',
    mpoa_4_address: '',
    mpoa_4_phone: '',
  };

  spouseAppointeeSummary = {
    id: undefined,
    user_id: undefined,
    executor_1_rank: '1',
    executor_1_name: '',
    executor_1_address: '',
    executor_1_phone: '',
    executor_2_rank: '2',
    executor_2_name: '',
    executor_2_address: '',
    executor_2_phone: '',
    executor_3_rank: '3',
    executor_3_name: '',
    executor_3_address: '',
    executor_3_phone: '',
    executor_4_rank: '4',
    executor_4_name: '',
    executor_4_address: '',
    executor_4_phone: '',

    trustee_1_rank: '1',
    trustee_1_name: '',
    trustee_1_address: '',
    trustee_1_phone: '',
    trustee_2_rank: '2',
    trustee_2_name: '',
    trustee_2_address: '',
    trustee_2_phone: '',
    trustee_3_rank: '3',
    trustee_3_name: '',
    trustee_3_address: '',
    trustee_3_phone: '',
    trustee_4_rank: '4',
    trustee_4_name: '',
    trustee_4_address: '',
    trustee_4_phone: '',

    fpoa_1_rank: '2',
    fpoa_1_name: '',
    fpoa_1_address: '',
    fpoa_1_phone: '',
    fpoa_2_rank: '2',
    fpoa_2_name: '',
    fpoa_2_address: '',
    fpoa_2_phone: '',
    fpoa_3_rank: '3',
    fpoa_3_name: '',
    fpoa_3_address: '',
    fpoa_3_phone: '',
    fpoa_4_rank: '4',
    fpoa_4_name: '',
    fpoa_4_address: '',
    fpoa_4_phone: '',

    mpoa_1_rank: '1',
    mpoa_1_name: '',
    mpoa_1_address: '',
    mpoa_1_phone: '',
    mpoa_2_rank: '2',
    mpoa_2_name: '',
    mpoa_2_address: '',
    mpoa_2_phone: '',
    mpoa_3_rank: '3',
    mpoa_3_name: '',
    mpoa_3_address: '',
    mpoa_3_phone: '',
    mpoa_4_rank: '4',
    mpoa_4_name: '',
    mpoa_4_address: '',
    mpoa_4_phone: '',
  };

  constructor(
    private familyMemberService: FamilyMemberService,
    private appointeeSummaryService: AppointeeSummaryService,
  ) {}

  ngOnInit(): void {
    this.client = this.matter.client;
    this.clientAppointeeSummary.user_id = this.client.id;
    this.loadSpouse();
    this.loadClientAppointeeSummary();
    
  }

  private loadSpouse(): void {
    this.familyMemberService.getByUserId(this.client.id).subscribe((res) => {
      if (res) {
        this.spouse = res.find((x) => x.family_member.relationship_type === 'spouse');
        if (this.spouse) {
          console.log("There should be a spouse", this.spouse);
          this.spouseAppointeeSummary.user_id = this.spouse.id;
          this.loadSpouseAppointeeSummary();
        }
        console.log('spouse', this.spouse);
      }
    });
  }

  // loads the client appointee summary from the db if it exists
  private loadClientAppointeeSummary() : void {

    this.appointeeSummaryService.getWithUserId(this.client.id).subscribe((res) => {
      if (res) {

        this.clientAppointeeSummary = res;
        console.log('clientAppointeeSummary load', this.clientAppointeeSummary);
      }
    }
    );
  }

  // loads the spouse appointee summary from the db if it exists
  private loadSpouseAppointeeSummary() : void {

    this.appointeeSummaryService.getWithUserId(this.spouse.id).subscribe((res) => {
      if (res) {

        this.spouseAppointeeSummary = res;
        console.log('spouseAppointeeSummary load', this.spouseAppointeeSummary);
      }
    }
    );
  }


  // if there is a spouse, this will set the rank 1
  // of each type to the spouse information
  private initClientAppointeeForm(): void {
    this.clientAppointeeSummary.user_id = this.client.id;
    this.clientAppointeeSummary.executor_1_name =
      this.spouse.first_name + ' ' + this.spouse.last_name;
    this.clientAppointeeSummary.executor_1_address =
      this.spouse.address +
      ' ' +
      this.spouse.city +
      ' ' +
      this.spouse.state +
      ' ' +
      this.spouse.zip;
    this.clientAppointeeSummary.executor_1_phone = this.spouse.phone;

    this.clientAppointeeSummary.trustee_1_name =
      this.spouse.first_name + ' ' + this.spouse.last_name;
    this.clientAppointeeSummary.trustee_1_address =
      this.spouse.addressi +
      ' ' +
      this.spouse.city +
      ' ' +
      this.spouse.state +
      ' ' +
      this.spouse.zip;
    this.clientAppointeeSummary.trustee_1_phone = this.spouse.phone;

    this.clientAppointeeSummary.fpoa_1_name = this.spouse.first_name + ' ' + this.spouse.last_name;
    this.clientAppointeeSummary.fpoa_1_address =
      this.spouse.address +
      ' ' +
      this.spouse.city +
      ' ' +
      this.spouse.state +
      ' ' +
      this.spouse.zip;
    this.clientAppointeeSummary.fpoa_1_phone = this.spouse.phone;

    this.clientAppointeeSummary.mpoa_1_name = this.spouse.first_name + ' ' + this.spouse.last_name;
    this.clientAppointeeSummary.mpoa_1_address =
      this.spouse.address +
      ' ' +
      this.spouse.city +
      ' ' +
      this.spouse.state +
      ' ' +
      this.spouse.zip;
    this.clientAppointeeSummary.mpoa_1_phone = this.spouse.phone;
  }

  private initSpouseAppointeeForm(): void {
    this.spouseAppointeeSummary.user_id = this.spouse.id;
    this.spouseAppointeeSummary.executor_1_name =
      this.client.first_name + ' ' + this.client.last_name;
    this.spouseAppointeeSummary.executor_1_address =
      this.client.address +
      ' ' +
      this.client.city +
      ' ' +
      this.client.state +
      ' ' +
      this.client.zip;
    this.spouseAppointeeSummary.executor_1_phone = this.client.phone;

    this.spouseAppointeeSummary.trustee_1_name =
      this.client.first_name + ' ' + this.client.last_name;
    this.spouseAppointeeSummary.trustee_1_address =
      this.client.addressi +
      ' ' +
      this.client.city +
      ' ' +
      this.client.state +
      ' ' +
      this.client.zip;
    this.spouseAppointeeSummary.trustee_1_phone = this.client.phone;

    this.spouseAppointeeSummary.fpoa_1_name = this.client.first_name + ' ' + this.client.last_name;
    this.spouseAppointeeSummary.fpoa_1_address =
      this.client.address +
      ' ' +
      this.client.city +
      ' ' +
      this.client.state +
      ' ' +
      this.client.zip;
    this.spouseAppointeeSummary.fpoa_1_phone = this.client.phone;

    this.spouseAppointeeSummary.mpoa_1_name = this.client.first_name + ' ' + this.client.last_name;
    this.spouseAppointeeSummary.mpoa_1_address =
      this.client.address +
      ' ' +
      this.client.city +
      ' ' +
      this.client.state +
      ' ' +
      this.client.zip;
    this.spouseAppointeeSummary.mpoa_1_phone = this.client.phone;
  }

  //upserts the client appointee form
  upsertClient(): void {
    this.appointeeSummaryService.upsert(this.clientAppointeeSummary).subscribe((res) => {
      console.log('client appointee summary', res);
      this.clientAppointeeSummary = res[0];
    });
  }

  //upserts the spouse appointee form
  upsertSpouse(): void {
    if (this.spouse) {
      this.appointeeSummaryService.upsert(this.spouseAppointeeSummary).subscribe((res) => {
        console.log('spouse appointee summary', res);
        this.spouseAppointeeSummary = res[0];
      });
    }
  }
}
