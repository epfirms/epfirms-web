import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { OverlayService } from '@app/firm-portal/_services/overlay-service/overlay.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { Client } from '@app/_models/client';
import { Staff } from '@app/_models/staff';
import { DialogRef, DialogService } from '@ngneat/dialog';
import { Observable } from 'rxjs';
import { AddClientComponent } from '../add-client/add-client.component';

export interface Select {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent implements OnInit {
  keyword = 'full_name';

  roles: Select[] = [
    { value: 'role_admin', viewValue: 'Firm Admin' },
    { value: 'role_attorney', viewValue: 'Attorney' },
    { value: 'role_paralegal', viewValue: 'Paralegal' },
    { value: 'role_legal_assistant', viewValue: 'Legal Assistant' }
  ];

  filter = (items, query) => {
    return items.filter(i => {
      const name = i.full_name.split(" ").join("").toLowerCase();
      return name.includes(query.split(" ").join("").toLowerCase());
    });
  }

  attorneys$: Observable<Staff[]>;

  clients$: Observable<Client[]>;

  Data = [
    {
      id: 1,
      name: 'Usa',
    },
    {
      id: 2,
      name: 'England',
    },
  ];

  @ViewChild('slideOver') slideOver;

  closed: boolean = true;

  staffForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _renderer: Renderer2,
    private _dialogService: DialogService,
    public ref: DialogRef,
    private el: ElementRef,
    private _staffService: StaffService,
    private _clientService: ClientService,
    private _matterService: MatterService,
    
  ) { 
    this.attorneys$ = _staffService.filteredEntities$;
    this.clients$ = _clientService.entities$;
  }

  ngOnInit(): void {


    this.staffForm = this._fb.group({
      id: ['', [Validators.required]],
      //firm_id: ['', [Validators.required]],
      //user_id: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.email]],
      admin: [false],
      attorney: [false],
      legal_assistant: [false],
      paralegal: [false],
      active: [true],
      rate: [null],
    });
    this._staffService.setFilter('attorney');

    this.staffForm.get('first_name').setValue(this.ref.data.staff.first_name);
    this.staffForm.get('last_name').setValue(this.ref.data.staff.last_name);
    this.staffForm.get('id').setValue(this.ref.data.staff.id);
    this.staffForm.get('email').setValue(this.ref.data.staff.email);
    this.staffForm.get('phone').setValue(this.ref.data.staff.phone);
    this.staffForm.get('legal_assistant').setValue(this.ref.data.staff.firms[0].firm_employee.legal_assistant);
    this.staffForm.get('attorney').setValue(this.ref.data.staff.firms[0].firm_employee.attorney);
    this.staffForm.get('admin').setValue(this.ref.data.staff.firms[0].firm_employee.admin);
    this.staffForm.get('paralegal').setValue(this.ref.data.staff.firms[0].firm_employee.paralegal);


    console.log(this.Data, this.staffForm, this.ref.data)
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this._renderer.addClass(this.slideOver.nativeElement, 'translate-x-0');
    // }, 10);

  }

  close() {
    this.ref.close()
  }

  selectEvent(item: any, controlName: string) {
    this.staffForm.patchValue({[controlName]: item});
    this.staffForm.updateValueAndValidity();
  }

  onChangeSearch(val: string) {

  }

  onFocused(e) {

  }

  onClosed(e) {
  }

  openAddClient() {

  }

  onSubmit() {
    this._staffService.updateStaff(this.staffForm.value).subscribe(res => {
      this.close();
    });
  }

}
