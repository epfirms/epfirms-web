import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-intake-dialog',
  templateUrl: './intake-dialog.component.html',
  styleUrls: ['./intake-dialog.component.scss']
})
export class IntakeDialogComponent implements OnInit {
  // settings {title: string, content: string, backButton: boolean, continueButton: boolean}
  @Input() settings;
  constructor() { }

  ngOnInit(): void {
  }

}
