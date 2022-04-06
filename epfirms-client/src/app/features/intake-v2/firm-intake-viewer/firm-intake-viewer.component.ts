import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { ClientMatterService } from '@app/client-portal/_services/matter-service/client-matter.service';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';

@Component({
  selector: 'app-firm-intake-viewer',
  templateUrl: './firm-intake-viewer.component.html',
  styleUrls: ['./firm-intake-viewer.component.scss'],
})
export class FirmIntakeViewerComponent implements OnInit {
 // input bindings
  @Input() intake;
  @Input() matter;
  @Output() onIntakeSubmit = new EventEmitter<boolean>();

  //state that manages the views
  state: string = 'personal info';
  // stack that manages the views and enables the back() functionality
  history = [];

  constructor(
    private currentUserService: CurrentUserService,
    private clientMatterService : ClientMatterService,
    private matterService : MatterService
    
    ) {}

  ngOnInit(): void {
    console.log(this.intake);
    console.log("matter", this.matter);
  }

  setState(state: string): void {
    this.history.push(this.state);
    this.state = state;
  }

  sendIntake() : void {
    this.matterService.createIntake(this.matter.id).subscribe(res => {
      if (res) {
        console.log(res);
        this.matter.matter_intake = res;
      }
    });
  }

  back(): void {
    this.state = this.history.pop();
  }

  submit() : void {
    this.clientMatterService.updateMatterIntake({id: this.intake.id, status: "complete"}).subscribe();
  }
}
