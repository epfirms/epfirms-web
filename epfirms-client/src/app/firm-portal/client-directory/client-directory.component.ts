import { Component, OnInit } from '@angular/core';
import { Client } from '@app/core/interfaces/client';
import { Observable, Subscription } from 'rxjs';
import { ClientService } from '../_services/client-service/client.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { AddClientComponent } from '../overlays/add-client/add-client.component';
import { Matter } from '@app/core/interfaces/matter';
import { MatterService } from '../_services/matter-service/matter.service';
import { MatterTabsService } from '../../features/matter-tab/services/matter-tabs-service/matter-tabs.service';
import { EpModalService } from '@app/shared/modal/modal.service';

interface ClientDirectoryItem {
  letter: string;
  clients: Client[];
}
@Component({
  selector: 'app-client-directory',
  templateUrl: './client-directory.component.html',
  styleUrls: ['./client-directory.component.scss'],
  host: {
    class: 'flex-1 relative z-0 flex flex-col overflow-hidden',
  },
  animations: [
    trigger('toggleAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
    ]),
  ],
})
export class ClientDirectoryComponent implements OnInit {
  clients$: Observable<Client[]>;

  clientDirectoryItems: ClientDirectoryItem[];

  displayUserProfile: boolean = false;

  clientsSubscription: Subscription;

  searchTerm: string = '';

  clientFilterValues = {
    status: 'active',
    searchTerm: '',
  };

  paginator: { start: number; end: number } = { start: 0, end: 1 };

  selectedClient = null;

  selectedClientMatters: Matter[] = [];

  asideTab = 'profile';

  cases$: Observable<Matter[]>;

  constructor(
    private _clientService: ClientService,
    private _matterService: MatterService,
    private _matterTabsService: MatterTabsService,
    private _modalService: EpModalService,
  ) {
    this.clients$ = _clientService.filteredEntities$;
    this.cases$ = _matterService.filteredEntities$;
  }

  ngOnInit(): void {
    this.filter();
  }

  setSelectedClient(client) {
    if (this.selectedClient !== client) {
      this.selectedClient = client;
      this.loadClient(client);
    } else {
      this.selectedClient = null;
    }
  }

  loadClient(client) {
    this._matterService.getClientMatters(client.id).subscribe((matters) => {
      this.selectedClientMatters = [...matters];
    });
  }

  toggleUserProfile() {
    this.displayUserProfile = !this.displayUserProfile;
  }

  setPagination(current: { start: number; end: number }) {
    this.paginator = current;
  }

  filter() {
    const filterValues = Object.assign({}, this.clientFilterValues);
    this._clientService.setFilter(filterValues);
  }

  addClient() {
    this._modalService.create({
      epContent: AddClientComponent,
      epOkText: 'Add client',
      epCancelText: 'Cancel',
      epAutofocus: null,
      epOnOk: (componentInstance) => {
        this._clientService.createClient(componentInstance.clientForm.value).subscribe();
      },
    });
  }

  openTab(matter: Matter) {
    this._matterTabsService.add(matter.id);
  }
}
