import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  

  familyMembers = [];

  constructor(
    private familyMemberService : FamilyMemberService
  ) {}

  ngOnInit(): void {

    this.loadFamilyMembers();
  }

  loadFamilyMembers() : void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe(res => {
      console.log("FAMILY", res);
      if (res.length != 0) {
        this.familyMembers = res;
      }
    });
  }
  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }
}
