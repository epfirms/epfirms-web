import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-task-sms-confirmation',
  templateUrl: './task-sms-confirmation.component.html',
  styleUrls: ['./task-sms-confirmation.component.scss']
})
export class TaskSmsConfirmationComponent implements OnInit {
  cellPhoneNumber: string;

  smsBody: string = '';

  phoneInputMask = createMask({
    mask: '(999) 999-9999',
    placeholder: ' ',
    prefix: '+1',
    onBeforeMask: (value: string) => {
      const val = value.slice(2);
      return val;
    },
    parser: (value: string) => {
      const val = '+1' + value.replaceAll(/\(|\)|\-|\s/g, '');
      return val;
    },
  });

  constructor(
  ) { }

  ngOnInit(): void {
  }

  sendMessage() {
    
  }
}
