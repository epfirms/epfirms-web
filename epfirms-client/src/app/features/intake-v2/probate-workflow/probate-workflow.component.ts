import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';

@Component({
  selector: 'app-probate-workflow',
  templateUrl: './probate-workflow.component.html',
  styleUrls: ['./probate-workflow.component.scss']
})
export class ProbateWorkflowComponent implements OnInit {

  //input bindings
  @Input() matter : Matter;

  // state manages the view
  state : string = 'personal representative';

  constructor() { }

  ngOnInit(): void {
  }

  setState(state : string) {
    this.state = state;
  }


}
