import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { phoneInputMask } from '@app/core/util/phoneInputMask';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { USAState } from '@app/shared/utils/us-states/typings';
import { Observable } from 'rxjs';
import { PiData } from './PiData';
import { PiSettings } from './PiSettings';


@Component({
  selector: 'app-pi-table',
  templateUrl: './pi-table.component.html',
  styleUrls: ['./pi-table.component.scss']
})
export class PiTableComponent implements OnInit {

  @Input() settings: PiSettings;
  // data that is feed to component to patch the form
  @Input() data : PiData;
  @Output() changes = new EventEmitter<Object>();

  // states list
  public usaStates: USAState[] = usaStatesFull;

  // phone mask
  phoneInputMask = phoneInputMask;


  // relationship types
  relationshipTypes = ['sibling', 'parent', 'grandchild', 'grandparent', 'other'];

 //form for the table
 form = new FormGroup({
  first_name: new FormControl(''),
  middle_name: new FormControl(''),
  last_name: new FormControl(''),
  dob: new FormControl(''),
  email: new FormControl(''),
  phone: new FormControl(''),
  cell_phone: new FormControl(''),
  address: new FormControl(''),
  city: new FormControl(''),
  state: new FormControl(''),
  zip: new FormControl(''),
  county: new FormControl(''),
  profile_image: new FormControl(''),
  full_name: new FormControl(''),
  ssn: new FormControl(''),
  drivers_id: new FormControl(''),
  note: new FormControl(''),
  has_special_needs: new FormControl(false),
  is_minor: new FormControl(false),
  relationship_type: new FormControl(''),
  has_spouse: new FormControl(false),
  parent_1_name: new FormControl(''),
  parent_2_name: new FormControl(''),

 });

 formChanges; 

  constructor() { }

  ngOnInit(): void {
    this.patchForm();
    this.formChanges = this.form.valueChanges.subscribe(onChange => {
      this.emitChanges();
    });
  }

  ngOnDestroy(): void {
    this.formChanges.unsubscribe();
  }

  private patchForm(): void {
    this.form.patchValue(this.data);
  }

  private emitChanges(): void {
    this.changes.emit(this.form.value);
  }

  /**
   * 
   * @returns {string} in the format 'bg-{primaryColor}-500'
   */
  getColorClass() : string {
    
    return `bg-${this.settings.primaryColor}-500`;
  }

}
