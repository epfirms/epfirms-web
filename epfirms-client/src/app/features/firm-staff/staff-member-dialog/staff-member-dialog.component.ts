import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { createMask } from '@ngneat/input-mask';
import { FirmRoleService } from '../services/firm-role.service';

@Component({
  selector: 'app-staff-member-dialog',
  templateUrl: './staff-member-dialog.component.html',
  styleUrls: ['./staff-member-dialog.component.scss'],
})
export class StaffMemberDialogComponent implements OnInit {
  staffForm: FormGroup;

  roleOptions: any[] = [];

  role: any;

  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
  });

  constructor(
    private _dialogRef: DialogRef,
    private _fb: FormBuilder,
    private _firmRoleService: FirmRoleService,
  ) {}

  ngOnInit(): void {
    const dialogData = this._dialogRef.data;
    if (dialogData) {
      const staffMember = dialogData.staff;
      this.staffForm = this._fb.group({
        id: [staffMember.id, [Validators.required]],
        hourly_rate: [staffMember.hourly_rate],
        user: this._fb.group({
          id: [staffMember.user.id, [Validators.required]],
          first_name: [staffMember.user.first_name, [Validators.required]],
          last_name: [staffMember.user.last_name, [Validators.required]],
          phone: [staffMember.user.phone],
          email: [staffMember.user.email, [Validators.email]],
        }),
      });

      this.role = staffMember.role[0].id;
    } else {
      this.staffForm = this._fb.group({
        hourly_rate: [0],
        user: this._fb.group({
          first_name: ['', [Validators.required]],
          last_name: ['', [Validators.required]],
          phone: [''],
          email: [null, [Validators.email]],
        }),
      });
    }

    this._firmRoleService.get().subscribe((response) => {
      this.roleOptions = [...response.roles];
    });
  }

  add() {
    this._dialogRef.close({
      ...this.staffForm.value,
      role: [this.role],
    });
  }

  close() {
    this._dialogRef.close();
  }
}
