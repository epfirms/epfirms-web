import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientMatterService } from '@app/client-portal/_services/matter-service/client-matter.service';

@Component({
  selector: 'app-client-intake',
  templateUrl: './client-intake.component.html',
  styleUrls: ['./client-intake.component.scss'],
})
export class ClientIntakeComponent implements OnInit {
  // input bindings
  @Input() intake;

  @Input() matter;

  @Output() onIntakeSubmit = new EventEmitter<boolean>();

  //state that manages the views
  state: number = 0;

  // stack that manages the views and enables the back() functionality
  history = [];

  constructor(private clientMatterService: ClientMatterService) {}

  ngOnInit(): void {
    console.log(this.intake);
  }

  setState(state: number): void {
    this.history.push(this.state);
    this.state = state;
  }

  back(): void {
    this.state = this.history.pop();
  }

  submit(): void {
    this.clientMatterService
      .updateMatterIntake({ id: this.intake.id, status: 'complete' })
      .subscribe();
  }
}
