import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';

@Component({
  selector: 'app-client-estate-planning-intake',
  templateUrl: './client-estate-planning-intake.component.html',
  styleUrls: ['./client-estate-planning-intake.component.scss']
})
export class ClientEstatePlanningIntakeComponent implements OnInit {

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
