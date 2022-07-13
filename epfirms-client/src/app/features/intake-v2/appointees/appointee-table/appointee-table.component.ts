import { Component, Input, OnInit } from '@angular/core';
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

  private loadAppointees() : void {

  }

}
