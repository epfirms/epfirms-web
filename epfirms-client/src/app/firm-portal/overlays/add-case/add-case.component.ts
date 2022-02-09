import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { LegalAreaService } from '@app/firm-portal/_services/legal-area-service/legal-area.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { Client } from '@app/core/interfaces/client';
import { LegalArea } from '@app/core/interfaces/legal-area';
import { Staff } from '@app/core/interfaces/staff';
import { Observable, Subscription } from 'rxjs';
import { AddClientComponent } from '../add-client/add-client.component';
import { DialogRef, DialogService } from '@ngneat/dialog';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.scss'],
  host: {
    'class': 'contents'
  }
})
export class AddCaseComponent implements OnInit, OnDestroy {
  matterType: string;
  
  keyword = 'full_name';

  filter = (items, query) => {
    return items.filter(i => {
      const name = i.full_name.split(" ").join("").toLowerCase();
      return name.includes(query.split(" ").join("").toLowerCase());
    });
  }

  attorneys$: Observable<Staff[]>;

  clients$: Observable<Client[]>;

  closed: boolean = true;

  caseForm: FormGroup;

  legalAreas$: Observable<LegalArea[]>;

  selectedLegalArea: LegalArea = {
    name: '',
    color: 'gray'
  };

  note;

  clientId: number;

  attorneyId: number;

  clients: Client[] = [];

  filteredClients: Client[] = [];

  attorneys: Staff[] = [];

  filteredAttorneys: Staff[] = [];

  clientFilterHandler:Subscription;

  attorneyFilterHandler: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _staffService: StaffService,
    private _clientService: ClientService,
    private _matterService: MatterService,
    private _legalAreaService: LegalAreaService,
    private _dialogRef: DialogRef,
    private _dialogService: DialogService
  ) {
    this.matterType = _dialogRef.data.matter_type;
    this.attorneys$ = _staffService.filteredEntities$;
    this.clients$ = _clientService.entities$;
    this.legalAreas$ = _legalAreaService.entities$;
  }

  ngOnInit(): void {
    this.caseForm = this._fb.group({
      status: ['active', [Validators.required]],
      legal_area_id: [null, [Validators.required]],
      matter_type: [this.matterType],
      client_id: ['', [Validators.required]],
      attorney_id: [null, [Validators.required]],
      case_id: [null],
      spouse_id: [null],
      point_of_contact_id: [null],
      opposing_counsel_id: [null],
      reviews: [null]
    });
    this._staffService.setFilter({active: true, role: ['attorney']});

    this.attorneyFilterHandler = this.attorneys$.subscribe(a => {
      this.attorneys = a;
      this.filteredAttorneys = a;
    });

    this.clientFilterHandler = this.clients$.subscribe(c => {
      this.clients = c;
      this.filteredClients = c;
    })
  }

  ngOnDestroy(): void {
    this.clientFilterHandler.unsubscribe();
    this.attorneyFilterHandler.unsubscribe();
  }

  displayFn(value, options): string {
    console.log(value);
    console.log(options);
    const selectedStaffMember = options.find((option) => option.value === value);
    return selectedStaffMember ? selectedStaffMember.viewValue : 'Select a staff member';
  }

  filterClients(event) {
    this.filteredClients =
      event && event.length
        ? this.clients.filter((c) =>
            c.full_name.toLowerCase().includes(event.toLowerCase())
          )
        : [...this.clients];
  }

  filterAttorneys(event) {
    this.filteredAttorneys = event && event.length ? this.attorneys.filter((a) => a.user.full_name.toLowerCase().includes(event.toLowerCase())) : [...this.attorneys];
  }

  close(data?: any) {
    this._dialogRef.close(data);
  }

  selectEvent(item: any, controlName: string) {
    this.caseForm.patchValue({[controlName]: item});
    this.caseForm.updateValueAndValidity();
  }

  setLegalArea(legalArea: LegalArea) {
    this.selectedLegalArea = legalArea;
    this.selectEvent(legalArea.id, 'legal_area_id');
  }
  
  openAddClient() {
    const addClientDialog = this._dialogService.open(AddClientComponent, {});
    addClientDialog.afterClosed$.subscribe((data: any) => {
      if (data && data.id) {
      this.selectEvent(data.id, 'client_id');
      this.clientId = data.id;
    }
    });
  }

  openAddStaff() {
    // this._overlayService.add(AddClientComponent);
  }

  onSubmit() {
    this.close({matter: this.caseForm.value, note: this.note});
  }
}
