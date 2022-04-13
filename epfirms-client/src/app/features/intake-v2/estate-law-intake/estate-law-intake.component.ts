import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { ClientMatterService } from '@app/client-portal/_services/matter-service/client-matter.service';
import { FormSettings } from '@app/core/interfaces/FormSettings';
import { UserProfile } from '@app/core/interfaces/user-profile';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';

@Component({
  selector: 'app-estate-law-intake',
  templateUrl: './estate-law-intake.component.html',
  styleUrls: ['./estate-law-intake.component.scss'],
})
export class EstateLawIntakeComponent implements OnInit {
  // input bindings
  @Input() intake;
  @Input() matter;
  @Output() onIntakeSubmit = new EventEmitter<boolean>();

  //state that manages the views
  state: string = "intro";
  // stack that manages the views and enables the back() functionality
  history = [];

  progressBar = {
    info : false,
    income : false,
    assets : false,
    realEstate : false,
  }

  constructor(
    private clientMatterService: ClientMatterService,
    private familyMemberService: FamilyMemberService,
  ) {}

  ngOnInit(): void {
  }


setProgressBar(property : string, value : boolean): void {
  this.progressBar[property] = value;
}
  

  setState(state: string): void {
    this.history.push(this.state);
    this.state = state;
  }

  back(): void {
    this.state = this.history.pop();
  }

  submit(): void {
    this.clientMatterService
      .updateMatterIntake({ id: this.intake.id, status: 'complete' })
      .subscribe();
  }
}
