import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { NonUserProfile } from '@app/core/interfaces/NonUserProfile';
import { PiSettings, PiSettingsMode } from '@app/shared/pi-table/pi-table/PiSettings';
import { AppointeeSummaryService } from '../services/appointee-summary.service';

@Component({
  selector: 'app-appointees',
  templateUrl: './appointees.component.html',
  styleUrls: ['./appointees.component.scss'],
})
export class AppointeesComponent implements OnInit {
  @Input() matter;
  @Input() client;

  // client table settings
  clientSettings: PiSettings;

  // state that manages tabs when there is spouse
  state: string = 'client';

  clientAppointees = [];
  spouseAppointees = [];

  constructor() {}

  private initPiTableSettings(): void {
    this.clientSettings = new PiSettings('Appointee', PiSettingsMode.Appointee);
  }

  ngOnInit(): void {
    this.initPiTableSettings();
  }

  addClientAppointee(): void {
    this.clientAppointees.push(new NonUserProfile());
  }
}
