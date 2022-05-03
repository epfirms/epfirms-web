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

  // state that manages tabs when there is spouse
  state: string = 'client';

  // options that are going to be passed to the combo box

  clientOptions = [];

  spouseOptions = [];

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
  familyMembers: any;

  // boolean to check when client summary is loaded
  clientSummaryLoaded = false;

  constructor(
    private familyMemberService: FamilyMemberService,
    private appointeeSummaryService: AppointeeSummaryService,
  ) {}

  ngOnInit(): void {
    this.client = this.matter.client;
    this.clientAppointeeSummary.user_id = this.client.id;
    this.loadSpouse();
    this.loadClientAppointeeSummary();

    this.initOptions();
  }

  private initOptions(): void {
    this.familyMemberService.getByUserId(this.client.id).subscribe((familyMembers) => {
      this.familyMembers = familyMembers;
      this.familyMembers.forEach((familyMember) => {
        this.clientOptions.push({
          label: familyMember.first_name + ' ' + familyMember.last_name,
          value: familyMember.first_name + ' ' + familyMember.last_name,
          data: {
            address: `${familyMember.address},${familyMember.city},${familyMember.state},${familyMember.zip}`,
            phone: familyMember.phone,
          },
        });
        if (familyMember.family_member.relationship !== 'spouse') {
          this.spouseOptions.push({
            label: familyMember.first_name + ' ' + familyMember.last_name,
            value: familyMember.first_name + ' ' + familyMember.last_name,
            data: {
              address: `${familyMember.address},${familyMember.city},${familyMember.state},${familyMember.zip}`,
              phone: familyMember.phone,
            },
          });
        }
      });

      this.spouseOptions.push({
        label: this.client.first_name + ' ' + this.client.last_name,
        value: this.client.first_name + ' ' + this.client.last_name,
        data: {
          address: `${this.client.address},${this.client.city},${this.client.state},${this.client.zip}`,
          phone: this.client.phone,
        },
      });
    });
  }

  private loadSpouse(): void {
    this.familyMemberService.getByUserId(this.client.id).subscribe((res) => {
      if (res) {
        this.spouse = res.find((x) => x.family_member.relationship_type === 'spouse');
        if (this.spouse) {
          this.spouseAppointeeSummary.user_id = this.spouse.id;
          this.loadSpouseAppointeeSummary();
        }
      }
    });
  }

  // loads the client appointee summary from the db if it exists
  private loadClientAppointeeSummary(): void {
    this.appointeeSummaryService.getWithUserId(this.client.id).subscribe((res) => {
      if (res) {
        this.clientAppointeeSummary = res;

        this.clientSummaryLoaded = true;
      }
    });
  }

  // loads the spouse appointee summary from the db if it exists
  private loadSpouseAppointeeSummary(): void {
    this.appointeeSummaryService.getWithUserId(this.spouse.id).subscribe((res) => {
      if (res) {
        this.spouseAppointeeSummary = res;
      }
    });
  }

  //upserts the client appointee form
  upsertClient(): void {
    this.appointeeSummaryService.upsert(this.clientAppointeeSummary).subscribe((res) => {
      this.clientAppointeeSummary = res[0];
    });
  }

  //upserts the spouse appointee form
  upsertSpouse(): void {
    if (this.spouse) {
      this.appointeeSummaryService.upsert(this.spouseAppointeeSummary).subscribe((res) => {
        this.spouseAppointeeSummary = res[0];
      });
    }
  }

  //copy down
  // mode: 'client' or 'spouse'
  // location: 'trustee' or 'fpoa' or 'mpoa'
  copyDown(mode: string, location: string): void {
    if (mode === 'client') {
      if (location === 'trustee') {
        this.clientAppointeeSummary.trustee_1_rank = this.clientAppointeeSummary.executor_1_rank;
        this.clientAppointeeSummary.trustee_1_name = this.clientAppointeeSummary.executor_1_name;
        this.clientAppointeeSummary.trustee_1_address =
          this.clientAppointeeSummary.executor_1_address;
        this.clientAppointeeSummary.trustee_1_phone = this.clientAppointeeSummary.executor_1_phone;
        this.clientAppointeeSummary.trustee_2_rank = this.clientAppointeeSummary.executor_2_rank;
        this.clientAppointeeSummary.trustee_2_name = this.clientAppointeeSummary.executor_2_name;
        this.clientAppointeeSummary.trustee_2_address =
          this.clientAppointeeSummary.executor_2_address;
        this.clientAppointeeSummary.trustee_2_phone = this.clientAppointeeSummary.executor_2_phone;
        this.clientAppointeeSummary.trustee_3_rank = this.clientAppointeeSummary.executor_3_rank;
        this.clientAppointeeSummary.trustee_3_name = this.clientAppointeeSummary.executor_3_name;
        this.clientAppointeeSummary.trustee_3_address =
          this.clientAppointeeSummary.executor_3_address;
        this.clientAppointeeSummary.trustee_3_phone = this.clientAppointeeSummary.executor_3_phone;
        this.clientAppointeeSummary.trustee_4_rank = this.clientAppointeeSummary.executor_4_rank;
        this.clientAppointeeSummary.trustee_4_name = this.clientAppointeeSummary.executor_4_name;
        this.clientAppointeeSummary.trustee_4_address =
          this.clientAppointeeSummary.executor_4_address;
        this.clientAppointeeSummary.trustee_4_phone = this.clientAppointeeSummary.executor_4_phone;
      } else if (location === 'fpoa') {
        this.clientAppointeeSummary.fpoa_1_rank = this.clientAppointeeSummary.trustee_1_rank;
        this.clientAppointeeSummary.fpoa_1_name = this.clientAppointeeSummary.trustee_1_name;
        this.clientAppointeeSummary.fpoa_1_address = this.clientAppointeeSummary.trustee_1_address;
        this.clientAppointeeSummary.fpoa_1_phone = this.clientAppointeeSummary.trustee_1_phone;
        this.clientAppointeeSummary.fpoa_2_rank = this.clientAppointeeSummary.trustee_2_rank;
        this.clientAppointeeSummary.fpoa_2_name = this.clientAppointeeSummary.trustee_2_name;
        this.clientAppointeeSummary.fpoa_2_address = this.clientAppointeeSummary.trustee_2_address;
        this.clientAppointeeSummary.fpoa_2_phone = this.clientAppointeeSummary.trustee_2_phone;
        this.clientAppointeeSummary.fpoa_3_rank = this.clientAppointeeSummary.trustee_3_rank;
        this.clientAppointeeSummary.fpoa_3_name = this.clientAppointeeSummary.trustee_3_name;
        this.clientAppointeeSummary.fpoa_3_address = this.clientAppointeeSummary.trustee_3_address;
        this.clientAppointeeSummary.fpoa_3_phone = this.clientAppointeeSummary.trustee_3_phone;
        this.clientAppointeeSummary.fpoa_4_rank = this.clientAppointeeSummary.trustee_4_rank;
        this.clientAppointeeSummary.fpoa_4_name = this.clientAppointeeSummary.trustee_4_name;
        this.clientAppointeeSummary.fpoa_4_address = this.clientAppointeeSummary.trustee_4_address;
        this.clientAppointeeSummary.fpoa_4_phone = this.clientAppointeeSummary.trustee_4_phone;
      } else if (location === 'mpoa') {
        this.clientAppointeeSummary.mpoa_1_rank = this.clientAppointeeSummary.fpoa_1_rank;
        this.clientAppointeeSummary.mpoa_1_name = this.clientAppointeeSummary.fpoa_1_name;
        this.clientAppointeeSummary.mpoa_1_address = this.clientAppointeeSummary.fpoa_1_address;
        this.clientAppointeeSummary.mpoa_1_phone = this.clientAppointeeSummary.fpoa_1_phone;
        this.clientAppointeeSummary.mpoa_2_rank = this.clientAppointeeSummary.fpoa_2_rank;
        this.clientAppointeeSummary.mpoa_2_name = this.clientAppointeeSummary.fpoa_2_name;
        this.clientAppointeeSummary.mpoa_2_address = this.clientAppointeeSummary.fpoa_2_address;
        this.clientAppointeeSummary.mpoa_2_phone = this.clientAppointeeSummary.fpoa_2_phone;
        this.clientAppointeeSummary.mpoa_3_rank = this.clientAppointeeSummary.fpoa_3_rank;
        this.clientAppointeeSummary.mpoa_3_name = this.clientAppointeeSummary.fpoa_3_name;
        this.clientAppointeeSummary.mpoa_3_address = this.clientAppointeeSummary.fpoa_3_address;
        this.clientAppointeeSummary.mpoa_3_phone = this.clientAppointeeSummary.fpoa_3_phone;
        this.clientAppointeeSummary.mpoa_4_rank = this.clientAppointeeSummary.fpoa_4_rank;
        this.clientAppointeeSummary.mpoa_4_name = this.clientAppointeeSummary.fpoa_4_name;
        this.clientAppointeeSummary.mpoa_4_address = this.clientAppointeeSummary.fpoa_4_address;
        this.clientAppointeeSummary.mpoa_4_phone = this.clientAppointeeSummary.fpoa_4_phone;
      }
      this.upsertClient();
    } else if (mode === 'spouse') {
      if (location === 'trustee') {
        this.spouseAppointeeSummary.trustee_1_rank = this.spouseAppointeeSummary.executor_1_rank;
        this.spouseAppointeeSummary.trustee_1_name = this.spouseAppointeeSummary.executor_1_name;
        this.spouseAppointeeSummary.trustee_1_address =
          this.spouseAppointeeSummary.executor_1_address;
        this.spouseAppointeeSummary.trustee_1_phone = this.spouseAppointeeSummary.executor_1_phone;
        this.spouseAppointeeSummary.trustee_2_rank = this.spouseAppointeeSummary.executor_2_rank;
        this.spouseAppointeeSummary.trustee_2_name = this.spouseAppointeeSummary.executor_2_name;
        this.spouseAppointeeSummary.trustee_2_address =
          this.spouseAppointeeSummary.executor_2_address;
        this.spouseAppointeeSummary.trustee_2_phone = this.spouseAppointeeSummary.executor_2_phone;
        this.spouseAppointeeSummary.trustee_3_rank = this.spouseAppointeeSummary.executor_3_rank;
        this.spouseAppointeeSummary.trustee_3_name = this.spouseAppointeeSummary.executor_3_name;
        this.spouseAppointeeSummary.trustee_3_address =
          this.spouseAppointeeSummary.executor_3_address;
        this.spouseAppointeeSummary.trustee_3_phone = this.spouseAppointeeSummary.executor_3_phone;
        this.spouseAppointeeSummary.trustee_4_rank = this.spouseAppointeeSummary.executor_4_rank;
        this.spouseAppointeeSummary.trustee_4_name = this.spouseAppointeeSummary.executor_4_name;
        this.spouseAppointeeSummary.trustee_4_address =
          this.spouseAppointeeSummary.executor_4_address;
        this.spouseAppointeeSummary.trustee_4_phone = this.spouseAppointeeSummary.executor_4_phone;
      } else if (location === 'fpoa') {
        this.spouseAppointeeSummary.fpoa_1_rank = this.spouseAppointeeSummary.trustee_1_rank;
        this.spouseAppointeeSummary.fpoa_1_name = this.spouseAppointeeSummary.trustee_1_name;
        this.spouseAppointeeSummary.fpoa_1_address = this.spouseAppointeeSummary.trustee_1_address;
        this.spouseAppointeeSummary.fpoa_1_phone = this.spouseAppointeeSummary.trustee_1_phone;
        this.spouseAppointeeSummary.fpoa_2_rank = this.spouseAppointeeSummary.trustee_2_rank;
        this.spouseAppointeeSummary.fpoa_2_name = this.spouseAppointeeSummary.trustee_2_name;
        this.spouseAppointeeSummary.fpoa_2_address = this.spouseAppointeeSummary.trustee_2_address;
        this.spouseAppointeeSummary.fpoa_2_phone = this.spouseAppointeeSummary.trustee_2_phone;
        this.spouseAppointeeSummary.fpoa_3_rank = this.spouseAppointeeSummary.trustee_3_rank;
        this.spouseAppointeeSummary.fpoa_3_name = this.spouseAppointeeSummary.trustee_3_name;
        this.spouseAppointeeSummary.fpoa_3_address = this.spouseAppointeeSummary.trustee_3_address;
        this.spouseAppointeeSummary.fpoa_3_phone = this.spouseAppointeeSummary.trustee_3_phone;
        this.spouseAppointeeSummary.fpoa_4_rank = this.spouseAppointeeSummary.trustee_4_rank;
        this.spouseAppointeeSummary.fpoa_4_name = this.spouseAppointeeSummary.trustee_4_name;
        this.spouseAppointeeSummary.fpoa_4_address = this.spouseAppointeeSummary.trustee_4_address;
        this.spouseAppointeeSummary.fpoa_4_phone = this.spouseAppointeeSummary.trustee_4_phone;
      } else if (location === 'mpoa') {
        this.spouseAppointeeSummary.mpoa_1_rank = this.spouseAppointeeSummary.fpoa_1_rank;
        this.spouseAppointeeSummary.mpoa_1_name = this.spouseAppointeeSummary.fpoa_1_name;
        this.spouseAppointeeSummary.mpoa_1_address = this.spouseAppointeeSummary.fpoa_1_address;
        this.spouseAppointeeSummary.mpoa_1_phone = this.spouseAppointeeSummary.fpoa_1_phone;
        this.spouseAppointeeSummary.mpoa_2_rank = this.spouseAppointeeSummary.fpoa_2_rank;
        this.spouseAppointeeSummary.mpoa_2_name = this.spouseAppointeeSummary.fpoa_2_name;
        this.spouseAppointeeSummary.mpoa_2_address = this.spouseAppointeeSummary.fpoa_2_address;
        this.spouseAppointeeSummary.mpoa_2_phone = this.spouseAppointeeSummary.fpoa_2_phone;
        this.spouseAppointeeSummary.mpoa_3_rank = this.spouseAppointeeSummary.fpoa_3_rank;
        this.spouseAppointeeSummary.mpoa_3_name = this.spouseAppointeeSummary.fpoa_3_name;
        this.spouseAppointeeSummary.mpoa_3_address = this.spouseAppointeeSummary.fpoa_3_address;
        this.spouseAppointeeSummary.mpoa_3_phone = this.spouseAppointeeSummary.fpoa_3_phone;
        this.spouseAppointeeSummary.mpoa_4_rank = this.spouseAppointeeSummary.fpoa_4_rank;
        this.spouseAppointeeSummary.mpoa_4_name = this.spouseAppointeeSummary.fpoa_4_name;
        this.spouseAppointeeSummary.mpoa_4_address = this.spouseAppointeeSummary.fpoa_4_address;
        this.spouseAppointeeSummary.mpoa_4_phone = this.spouseAppointeeSummary.fpoa_4_phone;
      }
      this.upsertSpouse();
    }
  }
}
