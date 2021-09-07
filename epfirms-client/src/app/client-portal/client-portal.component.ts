import { Component } from '@angular/core';

@Component({
  selector: 'app-client-portal',
  templateUrl: './client-portal.component.html',
  styleUrls: ['./client-portal.component.scss'],
  host: {
    class: 'inset-0 flex flex-col absolute overflow-hidden',
  },
})
export class ClientPortalComponent {
  constructor() {}
}
