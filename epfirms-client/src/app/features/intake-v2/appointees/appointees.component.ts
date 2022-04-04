import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointeeService } from '@app/client-portal/_services/appointee-service/appointee.service';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';

@Component({
  selector: 'app-appointees',
  templateUrl: './appointees.component.html',
  styleUrls: ['./appointees.component.scss'],
})
export class AppointeesComponent implements OnInit {
  @Input() matter;
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();

  spouse;
  client;
  familyMembers = [];
  appointees = [];
  spouseAppointees = [];

  constructor(
    private familyMemberService: FamilyMemberService,
    private appointeeService: AppointeeService,
  ) {}

  ngOnInit(): void {
    this.loadFamilyMembers();
  }

  private loadFamilyMembers(): void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe((res) => {
      console.log('FAMILY', res);
      if (res.length != 0) {
        this.familyMembers = res;
        this.loadAppointees(this.familyMembers);
        this.checkForSpouse();
      }
    });
  }

  private checkForSpouse(): void {
    this.familyMembers.forEach((member) => {
      if (member.relationship_type == 'spouse') {
        this.spouse = member;
        this.loadSpouseAppointees();
      }
    });
  }

  private loadAppointees(familyMembers): void {
    this.appointeeService.getByUserId(this.matter.client.id).subscribe((res) => {
      // if there are appointees, we need to map them to family members and then add to list of
      // appointees

      if (res) {
        console.log('family members', familyMembers);
        console.log('appointees', res);
        this.mergeIntoAppointees(familyMembers, res);
      }
    });
  }

  private loadSpouseAppointees(): void {
    if (this.spouse) {
      this.appointeeService.getByUserId(this.spouse.id).subscribe((res) => {
        if (res) {
          this.spouseAppointees = res;
          this.mergeIntoSpouseAppointees(this.familyMembers, this.spouseAppointees);
        }
      });
    }
  }

  private mergeIntoSpouseAppointees(familyMembers, appointees): void {
    familyMembers.forEach((member) => {
      appointees.forEach((appointee) => {
        if (member.id === appointee.appointee_id) {
          member.appointee = appointee.appointee;
          this.spouseAppointees.push(member);
        }
      });
    });
    console.log('merged spouse appintees and fam', this.spouseAppointees);
  }
  private mergeIntoAppointees(familyMembers, appointees): void {
    familyMembers.forEach((member) => {
      appointees.forEach((appointee) => {
        if (member.id === appointee.appointee_id) {
          member.appointee = appointee.appointee;
          this.appointees.push(member);
        }
      });
    });
    console.log('merged appintees and fam', this.appointees);
  }

  addAppointee(): void {
    this.appointees.push({
      id: '',
      first_name: '',
      user_id: this.matter.client.id,
      last_name: '',
      relationship_type: '',
      appointee: {
        id: '',
        type: ''
      },
      family_member: {
        id: '',
        relationship_type: ''
      },

    });
  }

  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }
}
