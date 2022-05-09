import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';

@Component({
  selector: 'app-estate-planning-workflow',
  templateUrl: './estate-planning-workflow.component.html',
  styleUrls: ['./estate-planning-workflow.component.scss']
})
export class EstatePlanningWorkflowComponent implements OnInit {

  // input bindings
  @Input() matter : Matter;

  // state that manages the views
  state: string = 'personal info';

  constructor() { }

  ngOnInit(): void {
  }


  setState(state: string): void {
    this.state = state;
  }



}
