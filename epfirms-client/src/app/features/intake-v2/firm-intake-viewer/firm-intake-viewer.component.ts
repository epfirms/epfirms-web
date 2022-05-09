import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { ClientMatterService } from '@app/client-portal/_services/matter-service/client-matter.service';
import { Matter } from '@app/core/interfaces/matter';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { emailService } from '@app/shared/_services/email-service/email.service';

@Component({
  selector: 'app-firm-intake-viewer',
  templateUrl: './firm-intake-viewer.component.html',
  styleUrls: ['./firm-intake-viewer.component.scss'],
})
export class FirmIntakeViewerComponent implements OnInit {
 // input bindings
  @Input() matter : Matter;


  constructor(
    
    ) {}

  ngOnInit(): void {
  }

  
}
