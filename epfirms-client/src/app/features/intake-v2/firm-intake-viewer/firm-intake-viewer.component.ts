import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { ClientMatterService } from '@app/client-portal/_services/matter-service/client-matter.service';
import { Matter } from '@app/core/interfaces/matter';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { emailService } from '@app/shared/_services/email-service/email.service';
import { IntakeService } from '../services/intake.service';

@Component({
  selector: 'app-firm-intake-viewer',
  templateUrl: './firm-intake-viewer.component.html',
  styleUrls: ['./firm-intake-viewer.component.scss'],
})
export class FirmIntakeViewerComponent implements OnInit {
  // input bindings
  @Input() matter: Matter;

  intake;

  // selectedIntake for when the user needs to select one to start
  selectedIntake: string;

  // boolean that determines whether to send the intake to client
  sendIntakeToClient: boolean = false;

  constructor(private intakeService: IntakeService, private emailService : emailService) {}

  ngOnInit(): void {
    console.log('matter', this.matter);
    this.intakeService.getOneWithMatterId(this.matter.id).subscribe((intake) => {
      console.log(intake);
      if (intake) {
        console.log('intake', intake);
        this.intake = intake;
      }
    });
  }

  toggleSendIntakeToClient(): void {
    this.sendIntakeToClient = !this.sendIntakeToClient;
  }

  startIntake(): void {
    console.log('startIntake');

    console.log("send intake?", this.sendIntakeToClient);
    this.intakeService
      .upsert({
        matter_id: this.matter.id,
        type: this.selectedIntake,
        status: this.sendIntakeToClient ? 'sent' : 'firm only',
      })
      .subscribe((intake) => {
        if (intake) {
          this.intake = intake[0];
        }
        if (intake && this.sendIntakeToClient) {

          this.emailService.sendIntakeNotifcation(this.matter.client.email).subscribe();
        }
        console.log(intake);
      });
  }
}
