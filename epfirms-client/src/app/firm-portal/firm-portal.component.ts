import { Component } from '@angular/core';

@Component({
  selector: 'app-firm-portal',
  templateUrl: './firm-portal.component.html',
  styleUrls: ['./firm-portal.component.scss'],
  host: {
    class: 'inset-0 flex flex-col absolute overflow-hidden',
  },
})
export class FirmPortalComponent {
  navItems = [
    {
      name: 'Home',
      link: '/firm'
    },
    {
      name: 'Cases',
      link: 'cases'
    },
    {
      name: 'Leads',
      link: 'leads'
    },
    {
      name: 'Client Directory',
      link: 'clients'
    },
    {
      name: 'Firm Settings',
      link: 'settings'
    },
  ]
  constructor() {}
}
