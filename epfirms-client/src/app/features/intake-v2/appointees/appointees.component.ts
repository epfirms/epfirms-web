import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';

@Component({
  selector: 'app-appointees',
  templateUrl: './appointees.component.html',
  styleUrls: ['./appointees.component.scss'],
})
export class AppointeesComponent implements OnInit {
  @Input() matter;

  @Input() appointeeType;

  spouse;
  client;

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
