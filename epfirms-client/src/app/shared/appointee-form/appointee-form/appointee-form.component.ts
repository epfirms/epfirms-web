import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppointeeService } from '@app/client-portal/_services/appointee-service/appointee.service';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { FormSettings } from '@app/core/interfaces/FormSettings';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { USAState } from '@app/shared/utils/us-states/typings';

@Component({
  selector: 'app-appointee-form',
  templateUrl: './appointee-form.component.html',
  styleUrls: ['./appointee-form.component.scss']
})
export class AppointeeFormComponent implements OnInit {

  // Input bindings
  @Input() userProfile;
  @Input() formSettings: FormSettings;
  @Input() matter; 
  @Input() familyMembers;
  // bindings that control state of dropdown
  dropdownVisible: boolean = false;

  



  appointeeTypes = [
    'executor',
    'trustee',
    'guardian of children',
    'durable power of attorney',
    'medical power of attorney',

  ]

  appointeeForm = new FormGroup({
    type: new FormControl(''),
    selectedFamilyMember: new FormControl(''),
    rank : new FormControl(),

  });

  constructor(
    private clientService: ClientService,
    private familyMemberService: FamilyMemberService,
    private appointeeService : AppointeeService,
  ) {}

  ngOnInit(): void {
  }




  // method that toggles the visiblity of the dropdown
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  submit(): void {
    

    this.appointeeService.addAppointee(this.userProfile.user_id, this.appointeeForm.value).subscribe();
    
    this.toggleDropdown();
  }
}
