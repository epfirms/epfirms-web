import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { OverlayService } from '@app/firm-portal/_services/overlay-service/overlay.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { Client } from '@app/_models/client';
import { Staff } from '@app/_models/staff';
import { Observable } from 'rxjs';
import { AddClientComponent } from '../add-client/add-client.component';

export interface Select {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {
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

  data = [
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
    private _overlayService: OverlayService,
    private _renderer: Renderer2,
    private el: ElementRef,
    private _staffService: StaffService,
    private _clientService: ClientService,
    private _matterService: MatterService
  ) { 
    this.attorneys$ = _staffService.filteredEntities$;
    this.clients$ = _clientService.entities$;
  }

  ngOnInit(): void {
    this.staffForm = this._fb.group({
      //id: ['', [Validators.required]],
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
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._renderer.addClass(this.slideOver.nativeElement, 'translate-x-0');
    }, 10);
  }

  close() {
    this._renderer.addClass(this.slideOver.nativeElement, 'translate-x-full');
    this._renderer.removeClass(this.slideOver.nativeElement, 'translate-x-0');
    setTimeout(() => {
      this._overlayService.clear();
    }, 300);
  }

  selectEvent(item: any, controlName: string) {
    console.log(item);
    this.staffForm.patchValue({[controlName]: item});
    this.staffForm.updateValueAndValidity();
    console.log(this.staffForm.value);
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

  onClosed(e) {
  }

  openAddClient() {
    this._overlayService.add(AddClientComponent);
  }

  openAddStaff() {
    // this._overlayService.add(AddClientComponent);
  }

  onSubmit() {
    console.log("value: ", this.staffForm.value)
    this._staffService.createStaff(this.staffForm.value).subscribe(res => {
      this.close();
    });
  }

}
