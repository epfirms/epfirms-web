import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';

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
    executor_1_rank: "1",
    executor_1_name: "",
    executor_1_address: "",
    executor_1_phone: "",
    executor_2_rank: "2",
    executor_2_name: "",
    executor_2_address: "",
    executor_2_phone: "",
    executor_3_rank: "3",
    executor_3_name: "",
    executor_3_address: "",
    executor_3_phone: "",
    executor_4_rank: "4",
    executor_4_name: "",
    executor_4_address: "",
    executor_4_phone: "",

    trustee_1_rank: "1",
    trustee_1_name: "",
    trustee_1_address: "",
    trustee_1_phone: "",
    trustee_2_rank: "2",
    trustee_2_name: "",
    trustee_2_address: "",
    trustee_2_phone: "",
    trustee_3_rank: "3",
    trustee_3_name: "",
    trustee_3_address: "",
    trustee_3_phone: "",
    trustee_4_rank: "4",
    trustee_4_name: "",
    trustee_4_address: "",
    trustee_4_phone: "",

    fpoa_1_rank: "1",
    fpoa_1_name: "",
    fpoa_1_address: "",
    fpoa_1_phone: "",
    fpoa_2_rank: "2",
    fpoa_2_name: "",
    fpoa_2_address: "",
    fpoa_2_phone: "",
    fpoa_3_rank: "3",
    fpoa_3_name: "",
    fpoa_3_address: "",
    fpoa_3_phone: "",
    fpoa_4_rank: "4",
    fpoa_4_name: "",
    fpoa_4_address: "",
    fpoa_4_phone: "",

    mpoa_1_rank: "1",
    mpoa_1_name: "",
    mpoa_1_address: "",
    mpoa_1_phone: "",
    mpoa_2_rank: "2",
    mpoa_2_name: "",
    mpoa_2_address: "",
    mpoa_2_phone: "",
    mpoa_3_rank: "3",
    mpoa_3_name: "",
    mpoa_3_address: "",
    mpoa_3_phone: "",
    mpoa_4_rank: "4",
    mpoa_4_name: "",
    mpoa_4_address: "",
    mpoa_4_phone: "",

  };

spouseAppointeeSummary = {
    id: undefined,
    user_id: undefined,
    executor_1_rank: "1",
    executor_1_name: "",
    executor_1_address: "",
    executor_1_phone: "",
    executor_2_rank: "2",
    executor_2_name: "",
    executor_2_address: "",
    executor_2_phone: "",
    executor_3_rank: "3",
    executor_3_name: "",
    executor_3_address: "",
    executor_3_phone: "",
    executor_4_rank: "4",
    executor_4_name: "",
    executor_4_address: "",
    executor_4_phone: "",

    trustee_1_rank: "1",
    trustee_1_name: "",
    trustee_1_address: "",
    trustee_1_phone: "",
    trustee_2_rank: "2",
    trustee_2_name: "",
    trustee_2_address: "",
    trustee_2_phone: "",
    trustee_3_rank: "3",
    trustee_3_name: "",
    trustee_3_address: "",
    trustee_3_phone: "",
    trustee_4_rank: "4",
    trustee_4_name: "",
    trustee_4_address: "",
    trustee_4_phone: "",

    fpoa_1_rank: "2",
    fpoa_1_name: "",
    fpoa_1_address: "",
    fpoa_1_phone: "",
    fpoa_2_rank: "2",
    fpoa_2_name: "",
    fpoa_2_address: "",
    fpoa_2_phone: "",
    fpoa_3_rank: "3",
    fpoa_3_name: "",
    fpoa_3_address: "",
    fpoa_3_phone: "",
    fpoa_4_rank: "4",
    fpoa_4_name: "",
    fpoa_4_address: "",
    fpoa_4_phone: "",

    mpoa_1_rank: "1",
    mpoa_1_name: "",
    mpoa_1_address: "",
    mpoa_1_phone: "",
    mpoa_2_rank: "2",
    mpoa_2_name: "",
    mpoa_2_address: "",
    mpoa_2_phone: "",
    mpoa_3_rank: "3",
    mpoa_3_name: "",
    mpoa_3_address: "",
    mpoa_3_phone: "",
    mpoa_4_rank: "4",
    mpoa_4_name: "",
    mpoa_4_address: "",
    mpoa_4_phone: "",

  };

  constructor(private familyMemberService: FamilyMemberService) {}

  ngOnInit(): void {
    this.client = this.matter.client;
    this.loadSpouse();
  }

  private loadSpouse(): void {
    this.familyMemberService.getByUserId(this.client.id).subscribe((res) => {
      if (res) {

      this.spouse = res.find((x) => x.family_member.relationship_type === 'spouse');
      console.log("spouse", this.spouse);
      }
    });
  }
}
