import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-firm-intake-viewer',
  templateUrl: './firm-intake-viewer.component.html',
  styleUrls: ['./firm-intake-viewer.component.scss']
})
export class FirmIntakeViewerComponent implements OnInit {

  @Input() matter;
  constructor() { }

  ngOnInit(): void {
  }

}
