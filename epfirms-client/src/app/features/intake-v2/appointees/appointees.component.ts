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

  @Input() appointeeType;

  appointeeDescription: string = '';
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
    this.client = this.matter.client;
    this.loadFamilyMembers();
  }

  private loadFamilyMembers(): void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe((res) => {
      console.log('FAMILY', res);
      if (res.length != 0) {
        this.familyMembers = res;
        this.loadAppointees();
        this.checkForSpouse();
      }
    });
  }

  private checkForSpouse(): void {
    this.familyMembers.forEach((member) => {
      if (member.family_member.relationship_type == 'spouse') {
        this.spouse = member;
        this.loadSpouseAppointees();
      }
    });
  }

  private loadAppointees(): void {
    this.appointeeService.getByUserId(this.matter.client.id).subscribe((res) => {
      // if there are appointees, we need to map them to family members and then add to list of
      // appointees

      if (res) {
        this.appointees = res.filter(
          (appointee) => appointee.appointee.type === this.appointeeType,
        );
        console.log('appointees', res);
      }
    });
  }

  private loadSpouseAppointees(): void {
    if (this.spouse) {
      this.appointeeService.getByUserId(this.spouse.id).subscribe((res) => {
        if (res) {
          this.spouseAppointees = res.filter(
            (appointee) => appointee.appointee.type === this.appointeeType,
          );

          console.log('spouse appointees', this.spouseAppointees);
        }
      });
    }
  }

  addAppointee(): void {
    this.appointees.push({
      user_id: this.matter.client.id,
      appointee: {
        id: '',
        type: this.appointeeType,
        rank: 0,
        user_id: this.matter.client.id,
        appointee_id: 0,
      },
    });
  }

  addSpouseAppointee(): void {
    this.spouseAppointees.push({
      appointee: {
        id: '',
        type: this.appointeeType,
        rank: 0,
        user_id: this.spouse.id,
        appointee_id: 0,
      },
    });
  }

  submit(): void {
    console.log(this.appointees);
    console.log(this.spouseAppointees);
    this.appointees.forEach((appointee) => {
      this.appointeeService.upsert(appointee.appointee).subscribe((res) => {
        console.log(res);
      });
    });
    this.spouseAppointees.forEach((appointee) => {
      this.appointeeService.upsert(appointee.appointee).subscribe((res) => {
        console.log(res);
      });
    });
  }

  delete(appointeeId, spouse) : void {
    console.log("deleting", appointeeId);
   this.appointeeService.delete(appointeeId).subscribe((res) => {
      console.log(res);
      
    }); 
    if (spouse) {
      this.spouseAppointees = this.spouseAppointees.filter((appointee) => appointee.appointee.id != appointeeId);
    } else {
      this.appointees = this.appointees.filter((appointee) => appointee.appointee.id != appointeeId);
    }
  }
  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }
}
