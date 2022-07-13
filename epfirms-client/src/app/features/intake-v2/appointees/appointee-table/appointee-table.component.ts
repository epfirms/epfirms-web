import { Component, Input, OnInit } from '@angular/core';
import { Appointee } from '@app/core/interfaces/Appointee';
import { Matter } from '@app/core/interfaces/matter';

@Component({
  selector: 'app-appointee-table',
  templateUrl: './appointee-table.component.html',
  styleUrls: ['./appointee-table.component.scss']
})
export class AppointeeTableComponent implements OnInit {


  @Input() title : string;
  @Input() matter : Matter;

  // the client profile
  @Input() client;
  // 'executor', 'trustee', 'mpoa', 'fpoa', 'gom', 'gop'
  @Input() appointeeType : string;

  //appointees list

  appointees = [];
  filteredAppointees = [];

  constructor() { }

  ngOnInit(): void {
  }

  
  addAppointee(): void {

    let appointee = new Appointee();
    appointee.setMatterId(this.matter.id);
    appointee.setAppointerId(this.client.id);
    appointee.setAppointeeType(this.appointeeType);

    console.log(appointee);

    this.filteredAppointees.push(appointee);

  }

}
