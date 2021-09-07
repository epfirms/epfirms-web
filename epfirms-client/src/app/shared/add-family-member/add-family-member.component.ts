import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssetService } from '@app/client-portal/_services/asset-service/asset.service';
import { ModalRef } from '@app/modal/modal-ref';
import { getYear } from 'date-fns';
import { DatepickerOptions } from 'ng2-datepicker';
import locale from 'date-fns/locale/en-US';
import { trigger, transition, style, animate } from '@angular/animations';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';

@Component({
  selector: 'app-add-family-member',
  templateUrl: './add-family-member.component.html',
  styleUrls: ['./add-family-member.component.scss'],
  animations: [
    trigger("toggleAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.95)" }),
        animate("100ms ease-out", style({ opacity: 1, transform: "scale(1)" }))
      ]),
      transition(":leave", [
        animate("75ms", style({ opacity: 0, transform: "scale(0.95)" }))
      ])
    ])
  ]
})
export class AddFamilyMemberComponent implements OnInit {
  familyMemberForm: FormGroup;

  familyMemberType: string;

  familyMemberOptions: any[] = [
    'child',
    'parent',
    'sibling',
    'other'
  ];

  options: DatepickerOptions = {
    minYear: getYear(new Date()) - 30, // minimum available and selectable year
    maxYear: getYear(new Date()) + 30, // maximum available and selectable year
    placeholder: '', // placeholder in case date model is null | undefined, example: 'Please pick a date'
    format: 'MMM d, yyyy', // date format to display in input
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: locale, // date-fns locale
    position: 'bottom',
    inputClass: 'mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm', // custom input CSS class to be applied
    calendarClass: 'datepicker-blue', // custom datepicker calendar CSS class to be applied
    scrollBarColor: '#dfe3e9', // in case you customize you theme, here you define scroll bar color
  };
  constructor(private _fb: FormBuilder, private _familyMemberService: FamilyMemberService, private _modalRef: ModalRef) { }

  ngOnInit(): void {
    this.familyMemberForm = this._fb.group({
      first_name: ['', [Validators.required]],
      middle_name: [''],
      last_name: [null, [Validators.required]],
      email: [null],
      phone: [null],
      address: [null],
      city: [null],
      state: [null],
      zip: [null],
    });
  }

  submit() {
    const familyMember = {
      ...this.familyMemberForm.value,
      relationship_type: this.familyMemberType
    };

    this._familyMemberService.addFamilyMember(familyMember).subscribe(res => {
      this.close(res);
    });
  }

  close(newMember?: any) {
    this._modalRef.close(newMember);
  }

  setFamilyMemberType(type: string) {
    this.familyMemberType = type;
  }
}
