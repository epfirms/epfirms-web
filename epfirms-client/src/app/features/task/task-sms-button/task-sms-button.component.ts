import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-sms-button',
  templateUrl: './task-sms-button.component.html',
  styleUrls: ['./task-sms-button.component.scss']
})
export class TaskSmsButtonComponent implements OnInit {
  @Input() set readonly(val: boolean) {
    this._readonly = val;
    if (val) {
      this.smsForm.get('body').disable();
    } else {
      this.smsForm.get('body').enable();
    }
    this.smsForm.updateValueAndValidity();
  }

  get readonly() {
    return this._readonly;
  }

  @Input() set smsMessage(value: {
    id: number;
    body: string;
    firm_template_task_id: number;
  }) {
    if (value) {
    this.smsForm.patchValue(value);
  } else {
    this.smsForm.patchValue({
      id: null, body: '', firm_template_task_id: null
    })
  }
    this.smsForm.updateValueAndValidity();
  }

  get smsMessage(): {
    id: number;
    body: string;
    firm_template_task_id: number;
  } {
    return this.smsForm.value;
  }

  @Output() save: EventEmitter<string> = new EventEmitter<string>();

  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  private _readonly: boolean = false;

  smsForm: FormGroup = this._formBuilder.group({
    id: [null],
    body: ['', Validators.required],
    firm_template_task_id: [null]
  });

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  emitSave() {
    this.save.emit(this.smsForm.value);
  }

  emitDelete() {
    this.delete.emit(this.smsForm.get('id').value);
  }

}
