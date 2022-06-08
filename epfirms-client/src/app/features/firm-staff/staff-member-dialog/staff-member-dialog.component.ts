import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PhoneValidator } from '@app/features/user/directives/async-phone-validator.directive';
import { UserService } from '@app/features/user/services/user.service';
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

  title: 'New' | 'Update';

  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
  });

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
    private _fb: FormBuilder,
    private _firmRoleService: FirmRoleService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this._firmRoleService.get().subscribe((response) => {
      this.roleOptions = [...response];
    });
  }
}
