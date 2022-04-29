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

  @Input() appointeeType;

  spouse;
  client;

  constructor(
    private familyMemberService: FamilyMemberService,
    private appointeeService: AppointeeService,
  ) {}

  ngOnInit(): void {
    this.client = this.matter.client;
  }
}
