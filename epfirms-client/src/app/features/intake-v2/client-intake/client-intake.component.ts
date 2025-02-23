import { W } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { Asset } from '@app/core/interfaces/asset';
import { Income } from '@app/core/interfaces/income';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { time } from 'console';
import {ClientMatterService} from '@app/client-portal/_services/matter-service/client-matter.service';
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

  constructor(
    private currentUserService: CurrentUserService,
    private clientMatterService : ClientMatterService,
    
    ) {}

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

  submit() : void {
    this.clientMatterService.updateMatterIntake({id: this.intake.id, status: "complete"}).subscribe();
  }
}
