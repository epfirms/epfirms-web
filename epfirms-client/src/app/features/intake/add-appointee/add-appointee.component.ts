import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointeeService } from '@app/client-portal/_services/appointee-service/appointee.service';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-add-appointee',
  templateUrl: './add-appointee.component.html',
  styleUrls: ['./add-appointee.component.scss']
})
export class AddAppointeeComponent implements OnInit {
  type: string;

  displayType: string;

  appointeeForm: FormGroup;

  ranks = [1, 2, 3, 4, 5];

  selectedRank: number = 1;

  constructor(private _fb: FormBuilder, private _dialogRef: DialogRef, private _appointeeService: AppointeeService) {
    this.type = _dialogRef.data.type;
    this.displayType = this.getDisplayType(this.type);
  }

  ngOnInit(): void {
    this.appointeeForm = this._fb.group({
      first_name: ['', [Validators.required]],
      middle_name: [''],
      last_name: [null, [Validators.required]],
      email: [null],
      phone: [null],
      address: [null],
      city: [null],
      state: [null],
      zip: [null],
      executor: [0],
      trustee: [0],
      dpoa: [0],
      mpoa: [0],
      gop: [0],
      goe: [0],
      gomc: [0],
    });

    if (this._dialogRef.data.appointeeData) {
      this.appointeeForm.addControl('id', new FormControl(''));
      this.appointeeForm.patchValue(this._dialogRef.data.appointeeData);
      this.appointeeForm.updateValueAndValidity();
    }
  }

  getDisplayType(type: string) {
    switch(type) {
      case 'goe':
        return 'guardian of estate'
      case 'gop':
        return 'guardian of person'
      case 'gomc':
        return 'guardian of minor children'
      case 'mpoa':
        return 'medical power of attorney'
      case 'dpoa':
        return 'durable power of attorney'
      case 'trustee':
        return 'trustee'
      case 'executor':
        return 'executor'
      default:
        return '';
    }
  }

  setRank(value: number) {
    this.selectedRank = value;
  }

  close(newMember?: any) {
    this._dialogRef.close(newMember);
  }

  submit() {
    const appointee = {
      ...this.appointeeForm.value,
      [this.type]: this.selectedRank
    };
    
    this.close(appointee);
  }
}
