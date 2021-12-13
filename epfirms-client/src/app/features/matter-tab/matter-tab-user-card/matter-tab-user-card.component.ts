import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddClientComponent } from '@app/firm-portal/overlays/add-client/add-client.component';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { Client } from '@app/core/interfaces/client';
import { Observable } from 'rxjs';
import { DialogService } from '@ngneat/dialog';

@Component({
  selector: 'app-matter-tab-user-card',
  templateUrl: './matter-tab-user-card.component.html',
  styleUrls: ['./matter-tab-user-card.component.scss'],
  animations: [
    trigger('toggleAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))])
    ])
  ]
})
export class MatterTabUserCardComponent {
  @Input()
  set user(value) {
    this._user = value;
  }
  get user() {
    return this._user;
  }

  @Input()
  set label(value: string) {
    this._label = value;
  }
  get label() {
    return this._label;
  }

  @Output() addClicked: EventEmitter<number> = new EventEmitter<number>();

  @Output() optionClicked: EventEmitter<any> = new EventEmitter<any>();

  clients$: Observable<Client[]>;

  private _label: string;

  private _user;
  constructor(
    private _matterService: MatterService,
    private _dialogService: DialogService,
    private _clientService: ClientService
  ) {
    this.clients$ = _clientService.entities$;
  }

  add(): void {}

  openAddClient(): void {
    const addClientDialog = this._dialogService.open(AddClientComponent);
    addClientDialog.afterClosed$.subscribe((data: any) => {
      if (data && data.id) {
        this.addClicked.emit(data.id);
      }
    });
  }

  selectEvent(item: any) {
    this.addClicked.emit(item);
  }

  selectOption(option: string) {
    this.optionClicked.emit({
      label: this.label,
      user: this.user,
      option
    });
  }
}
