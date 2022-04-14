import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';

@Component({
  selector: 'app-spouse-information',
  templateUrl: './spouse-information.component.html',
  styleUrls: ['./spouse-information.component.scss']
})
export class SpouseInformationComponent implements OnInit {

    // INPUT BINDINGS
  @Input() isVisible: boolean;
  @Input() matter;

  //OUTPUT BINDINGS
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();

  // holds the properties of the client
  client;

  spouse; 
  //array that holds family members
  familyMembers = [];


  constructor(
    private clientService: ClientService,
    private familyMemberService: FamilyMemberService,
  ) {}

  ngOnInit(): void {
   this.loadSpouse(); 
  }

 private loadSpouse(): void {
  this.familyMemberService.getByUserId(this.matter.client.id).subscribe((res) => {
    res.forEach(member => {
      if (member.family_member.relationship_type === 'spouse') {
        this.spouse = member;
      }
    });
  });
}


  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }


}
