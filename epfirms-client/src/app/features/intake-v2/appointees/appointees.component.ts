import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { Appointee } from '@app/core/interfaces/Appointee';
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

  

  // state that manages tabs when there is spouse
  state: string = 'client';

  
  //array of appointees for the client
  clientAppointees: Appointee[] = [];
  // array of appointees for the spouse of client
  spouseAppointees: Appointee[] = [];

  constructor() {}

  

  ngOnInit(): void {
   
  }

addAppointee(type: string, spouseMode : boolean): void {

    let appointee = new Appointee();
    appointee.setMatterId(this.matter.id);
    appointee.setAppointerId(this.client.id);
    appointee.setAppointeeType(type);

    console.log(appointee);

    if (spouseMode) {
      this.spouseAppointees.push(appointee);
    }
    else {

    this.clientAppointees.push(appointee);

    }


  }

  appointeeTypeFilter(appointees : Appointee[], type: string): Appointee[] {
    return appointees.filter(appointee => appointee.getType(type) === true);
  }

  

 
}
