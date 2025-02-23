import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { ClientMatterService } from '@app/client-portal/_services/matter-service/client-matter.service';
import { Matter } from '@app/core/interfaces/matter';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { EpModalService } from '@app/shared/modal/modal.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { emailService } from '@app/shared/_services/email-service/email.service';
import { IntakeService } from '../services/intake.service';
import { IntakeSettingsOverlayComponent } from './intake-settings-overlay/intake-settings-overlay.component';

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

  constructor(
    private intakeService: IntakeService,
    private emailService: emailService,
    private modalService: EpModalService,
  ) {}

  ngOnInit(): void {
    this.intakeService.getOneWithMatterId(this.matter.id).subscribe((intake) => {
      if (intake) {
        this.intake = intake;
      }
    });
  }

  toggleSendIntakeToClient(): void {
    this.sendIntakeToClient = !this.sendIntakeToClient;
  }

  startIntake(): void {
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
      });
  }

  // open the firm settings modal where you can change the intake type
  openIntakeSettingsModal(): void {
    const modal = this.modalService.create({
      epContent: IntakeSettingsOverlayComponent,
      epModalType: 'slideOver',
      epComponentParams: {
        matter: this.matter,
        intake: this.intake,
      },
    });

    modal.afterClose.subscribe((data) => {
      if (data) {
        this.intakeService.upsert(data).subscribe((intake) => {
          this.intake.type = data.type;
        });
      }
    });
  }
}
