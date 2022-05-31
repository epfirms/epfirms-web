import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';

@Component({
  selector: 'app-elder-law-workflow',
  templateUrl: './elder-law-workflow.component.html',
  styleUrls: ['./elder-law-workflow.component.scss']
})
export class ElderLawWorkflowComponent implements OnInit {

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
