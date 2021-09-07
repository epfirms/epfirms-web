import { trigger, transition, style, animate } from '@angular/animations';
import {
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { LegalAreaService } from '@app/firm-portal/_services/legal-area-service/legal-area.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { ModalRef } from '@app/modal/modal-ref';
import { ModalService } from '@app/modal/modal.service';
import { Client } from '@app/_models/client';
import { LegalArea } from '@app/_models/legal-area';
import { Staff } from '@app/_models/staff';
import { Observable } from 'rxjs';
import { AddClientComponent } from '../add-client/add-client.component';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.scss'],
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
export class AddCaseComponent implements OnInit {
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

  constructor(
    private _fb: FormBuilder,
    private _staffService: StaffService,
    private _clientService: ClientService,
    private _matterService: MatterService,
    private _legalAreaService: LegalAreaService,
    private _modalService: ModalService,
    private _modalRef: ModalRef
  ) {
    this.matterType = _modalRef.data.matter_type;
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
    this._staffService.setFilter('attorney');
  }

  close(data?: any) {
    this._modalRef.close(data);
  }

  selectEvent(item: any, controlName: string) {
    console.log(item);
    this.caseForm.patchValue({[controlName]: item});
    this.caseForm.updateValueAndValidity();
    console.log(this.caseForm.value);
  }

  setLegalArea(legalArea: LegalArea) {
    this.selectedLegalArea = legalArea;
    this.selectEvent(legalArea.id, 'legal_area_id');
  }
  
  openAddClient() {
    const addClientDialog = this._modalService.open(AddClientComponent, {});
    addClientDialog.afterClosed$.subscribe((close: any) => {
      if (close.data && close.data.id) {
      this.selectEvent(close.data.id, 'client_id');
    }
    });
  }

  openAddStaff() {
    // this._overlayService.add(AddClientComponent);
  }

  onSubmit() {
    this.close(this.caseForm.value);
  }
}
