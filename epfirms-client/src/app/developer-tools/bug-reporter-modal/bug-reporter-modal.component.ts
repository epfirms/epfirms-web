import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bug-reporter-modal',
  templateUrl: './bug-reporter-modal.component.html',
  styleUrls: ['./bug-reporter-modal.component.scss']
})
export class BugReporterModalComponent implements OnInit {

  //properties that get passed to the service call
  type: string = 'bug';
  details: string = '';


  constructor() { }

  ngOnInit(): void {
  }


}
