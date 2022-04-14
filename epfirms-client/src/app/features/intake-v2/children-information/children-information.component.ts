import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';

@Component({
  selector: 'app-children-information',
  templateUrl: './children-information.component.html',
  styleUrls: ['./children-information.component.scss'],
})
export class ChildrenInformationComponent implements OnInit {
  // INPUT BINDINGS
  @Input() isVisible: boolean;
  @Input() matter;

  //OUTPUT BINDINGS
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();

  // holds the properties of the client
  client;

  //array that holds children
children = [];

  constructor(
    private clientService: ClientService,
    private familyMemberService: FamilyMemberService,
  ) {}

  ngOnInit(): void {
    this.loadClientData();
    this.loadChildren();
  }

  private loadChildren(): void {
    this.familyMemberService.getByUserId(this.client.id).subscribe((res) => {
     this.children = res.filter((member) => member.family_member.relationship_type === 'minor child' || member.family_member.relationship_type === 'adult child');
    });
  }

  private loadClientData(): void {
    this.client = this.matter.client;
  }

  addChild(): void {
    let member = {
      first_name: '',
      last_name: '',
      family_member: { relationship_type: 'child' },
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      county: '',
      ssn: '',
      dob: '',
      template: true,
      drivers_id: '',
    };
    this.children.push(member);
  }
  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }
}
