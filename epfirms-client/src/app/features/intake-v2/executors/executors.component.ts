import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';

@Component({
  selector: 'app-executors',
  templateUrl: './executors.component.html',
  styleUrls: ['./executors.component.scss'],
})
export class ExecutorsComponent implements OnInit {
  @Input() matter;
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();

  familyMembers = [];
  // list of executors for the client
  executors = [];
  spouseExecutors = [];

  // does the client have a spouse? 
  hasSpouse : boolean = false;

  constructor(private familyMemberService: FamilyMemberService) {}

  ngOnInit(): void {
    this.loadFamilyMembers();
  }

  loadFamilyMembers(): void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe((res) => {
      if (res.length != 0) {
        this.familyMembers = res;
        this.checkForSpouse(res); 
      }
    });
  }
  private checkForSpouse(familyMembers) : void {
    console.log(familyMembers);
    if (familyMembers.filter(member => member.family_member.relationship_type === "spouse").length !== 0) {
      this.hasSpouse = true;
    }
  }
  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }

  addExecutor(forSpouse: boolean): void {
    let executor = {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      relationship_type: '',
    };
    if (forSpouse) {
      this.spouseExecutors.push(executor);
    } else {
      this.executors.push(executor);
    }
  }
  setFamilyMemberData(member, executor): void {
    executor.first_name = member.first_name;
    executor.last_name = member.last_name;
    executor.phone = member.phone;
    executor.email = member.email;
    executor.relationship_type = member.relationship_type;
  }

  setOther(executor): void {
    executor.first_name = 'first name';
    executor.last_name = 'last name';
    executor.phone = 'phone number';
    executor.email = 'email';
    executor.relationship_type = '';
  }
  setSpouse(executor): void {
    let client = this.matter.client;
    executor.first_name = client.first_name;
    executor.last_name = client.last_name;
    executor.phone = client.phone;
    executor.email = client.email;
    executor.relationship_type = 'spouse';
  }
}
