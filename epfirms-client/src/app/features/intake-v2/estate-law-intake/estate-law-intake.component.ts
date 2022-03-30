import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientMatterService } from '@app/client-portal/_services/matter-service/client-matter.service';
import { FormSettings } from '@app/core/interfaces/FormSettings';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';

@Component({
  selector: 'app-estate-law-intake',
  templateUrl: './estate-law-intake.component.html',
  styleUrls: ['./estate-law-intake.component.scss'],
})
export class EstateLawIntakeComponent implements OnInit {
  // input bindings
  @Input() intake;
  @Input() matter;
  @Output() onIntakeSubmit = new EventEmitter<boolean>();

  //state that manages the views
  state: number = 0;
  // stack that manages the views and enables the back() functionality
  history = [];

  // client form setting
  clientFormSetting: FormSettings;

  constructor(
    private currentUserService: CurrentUserService,
    private clientMatterService: ClientMatterService,
  ) {}

  ngOnInit(): void {
    console.log(this.intake);
    this.initFormSettings();
  }

  initFormSettings(): void {
    this.clientFormSetting = {
      title: 'Client Information',
      subtitle: this.matter.client.full_name,
      mode: 'CLIENT',
    };
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
