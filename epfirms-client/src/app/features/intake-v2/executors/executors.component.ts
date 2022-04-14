import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointeeService } from '@app/client-portal/_services/appointee-service/appointee.service';
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
  hasSpouse: boolean = false;
  spouse: any;

  constructor(
    private familyMemberService: FamilyMemberService,
    private appointeeService: AppointeeService,
  ) {}

  ngOnInit(): void {
    this.loadFamilyMembers();
    this.loadExecutors();
  }

  private loadFamilyMembers(): void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe((res) => {
      if (res.length != 0) {
        this.familyMembers = res;
        this.checkForSpouse(res);
      }
    });
  }
  private checkForSpouse(familyMembers): void {
    console.log(familyMembers);
    let spouse = familyMembers.filter(
      (member) => member.family_member.relationship_type === 'spouse',
    )[0];
    if (spouse) {
      this.hasSpouse = true;
      this.spouse = spouse;
      this.loadSpouseExecutors();
    }
  }

  private loadExecutors() : void {
    this.appointeeService.getByUserId(this.matter.client.id).subscribe(res => {
        console.log(res);
        if (res) {
          this.executors = res.filter(executor => executor.appointee.executor);
        }
    });
  }

  private loadSpouseExecutors() : void {
    this.appointeeService.getByUserId(this.spouse.id).subscribe(res => {
      console.log(res);
      if (res) {
        this.spouseExecutors = res.filter(executor => executor.appointee.executor);
      }
    });
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

  submit(): void {
    this.executors.forEach((executor) => {
      executor.executor = true;
      this.appointeeService.addAppointee(this.matter.client.id, executor).subscribe((res) => {
        console.log(res);
      });
    });
    this.spouseExecutors.forEach((executor) => {
      executor.executor = true;

      this.appointeeService.addAppointee(this.spouse.id, executor).subscribe((res) => {
        console.log(res);
      });
    });
  }
}
