import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-intake-dialog',
  templateUrl: './intake-dialog.component.html',
  styleUrls: ['./intake-dialog.component.scss']
})
export class IntakeDialogComponent implements OnInit {
  // settings {title: string, content: string, backButton: boolean, continueButton: boolean}
  @Input() settings;

  // dropdown form {question: string, value: boolean}
  @Input() dropdownForm;
  @Output() dropdownFormValues = new EventEmitter<boolean>();

  //output bindings to facilitate progress in the flow
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  backButton() : void {
    this.back.emit(true);
  }

  continueButton() : void {
    this.continue.emit(true);
    this.dropdownFormValues.emit(this.dropdownForm.value);
  }
}
