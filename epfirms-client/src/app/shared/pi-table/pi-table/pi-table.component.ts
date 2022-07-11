import { Component, Input, OnInit } from '@angular/core';
import { phoneInputMask } from '@app/core/util/phoneInputMask';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { USAState } from '@app/shared/utils/us-states/typings';
import { PiSettings } from './PiSettings';


@Component({
  selector: 'app-pi-table',
  templateUrl: './pi-table.component.html',
  styleUrls: ['./pi-table.component.scss']
})
export class PiTableComponent implements OnInit {

  @Input() settings: PiSettings;

  // states list
  public usaStates: USAState[] = usaStatesFull;

  phoneInputMask = phoneInputMask;


  // relationship types
  relationshipTypes = ['sibling', 'parent', 'grandchild', 'grandparent', 'other'];

  form;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 
   * @returns {string} in the format 'bg-{primaryColor}-500'
   */
  getColorClass() : string {
    
    return `bg-${this.settings.primaryColor}-500`;
  }

}
