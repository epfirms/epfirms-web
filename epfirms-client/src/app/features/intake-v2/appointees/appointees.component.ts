import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { Appointee } from '@app/core/interfaces/Appointee';
import { NonUserProfile } from '@app/core/interfaces/NonUserProfile';
import { phoneInputMask } from '@app/core/util/phoneInputMask';
import { PiSettings, PiSettingsMode } from '@app/shared/pi-table/pi-table/PiSettings';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { USAState } from '@app/shared/utils/us-states/typings';
import { AppointeeSummaryService } from '../services/appointee-summary.service';

@Component({
  selector: 'app-appointees',
  templateUrl: './appointees.component.html',
  styleUrls: ['./appointees.component.scss'],
})
export class AppointeesComponent implements OnInit {
  @Input() matter;
  @Input() client;

  
  // states list
  public usaStates: USAState[] = usaStatesFull;

  // phone mask
  phoneMask = phoneInputMask;

  // state that manages tabs when there is spouse
  state: string = 'client';

  familyMembers: any[] = [];
  clientOptions = [];
  spouseOptions = [];
  
  //array of appointees for the client
  clientAppointees: Appointee[] = [];
  // array of appointees for the spouse of client
  spouseAppointees: Appointee[] = [];

  constructor(private _familyMemberService : FamilyMemberService) {}

  

  ngOnInit(): void {
   
    this.initOptions();
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

  upsertAppointee(appointee: Appointee): void {

    console.log("upsert" ,appointee);

  }

  appointeeTypeFilter(appointees : Appointee[], type: string): Appointee[] {
    return appointees.filter(appointee => appointee.getType(type) === true);
  }

private initOptions(): void {
    this._familyMemberService.getByUserId(this.client.id).subscribe((familyMembers) => {
      this.familyMembers = familyMembers;
      this.familyMembers.forEach((familyMember) => {
        this.clientOptions.push({
          label: familyMember.first_name + ' ' + familyMember.last_name,
          value: familyMember.first_name + ' ' + familyMember.last_name,
          data: {
            address: `${familyMember.address},${familyMember.city},${familyMember.state},${familyMember.zip}`,
            phone: familyMember.phone,
          },
        });
        if (familyMember.family_member.relationship !== 'spouse') {
          this.spouseOptions.push({
            label: familyMember.first_name + ' ' + familyMember.last_name,
            value: familyMember.first_name + ' ' + familyMember.last_name,
            data: {
              address: `${familyMember.address},${familyMember.city},${familyMember.state},${familyMember.zip}`,
              phone: familyMember.phone,
            },
          });
        }
      });

      this.spouseOptions.push({
        label: this.client.first_name + ' ' + this.client.last_name,
        value: this.client.first_name + ' ' + this.client.last_name,
        data: {
          address: `${this.client.address},${this.client.city},${this.client.state},${this.client.zip}`,
          phone: this.client.phone,
        },
      });
    });
  }

  

 
}
