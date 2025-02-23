import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { DialogRef } from '@ngneat/dialog';

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

  constructor(private _fb: FormBuilder, private _familyMemberService: FamilyMemberService, private _dialogRef: DialogRef) {
    this.familyMemberType = _dialogRef.data.type;
   }

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

    this.close(familyMember);
  }

  close(newMember?: any) {
    this._dialogRef.close(newMember);
  }

  setFamilyMemberType(type: string) {
    this.familyMemberType = type;
  }
}
