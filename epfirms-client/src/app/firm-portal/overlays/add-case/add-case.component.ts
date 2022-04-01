import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { LegalAreaService } from '@app/firm-portal/_services/legal-area-service/legal-area.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { Client } from '@app/core/interfaces/client';
import { LegalArea } from '@app/core/interfaces/legal-area';
import { Staff } from '@app/core/interfaces/staff';
import { Observable, Subscription } from 'rxjs';
import { AddClientComponent } from '../add-client/add-client.component';
import { EpModalRef } from '@app/shared/modal/modal-ref';
import { EpModalService } from '@app/shared/modal/modal.service';
import { ConversationService } from '@app/features/conversation/services/conversation.service';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.scss'],
  host: {
    'class': 'contents'
  }
})
export class AddCaseComponent implements OnInit, OnDestroy {
  @Input() matterType?: string;
  
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

  enableChatToText: boolean = false;

  chatToTextNumber = new FormControl('');

  phoneInputMask = createMask({
    mask: '(999) 999-9999',
    placeholder: ' ',
    parser: (value: string) => {
      const val = '+1' + value.replaceAll(/\(|\)|\-|\s/g, '');
      return val;
    },
  });
  
  constructor(
    private _fb: FormBuilder,
    private _staffService: StaffService,
    private _clientService: ClientService,
    private _matterService: MatterService,
    private _legalAreaService: LegalAreaService,
    private _modalRef: EpModalRef,
    private _modalService: EpModalService,
    private _conversationService: ConversationService
  ) {
    this.attorneys$ = _staffService.filteredEntities$;
    this.clients$ = _clientService.entities$;
    this.legalAreas$ = _legalAreaService.entities$;
  }

  ngOnInit(): void {
    this.caseForm = this._fb.group({
      title: ['', Validators.required],
      status: ['active', [Validators.required]],
      legal_area_id: [null, [Validators.required]],
      matter_type: [this.matterType],
      client_id: [null, [Validators.required]],
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

  displayClient(value, options): string {
    const selectedStaffMember = options.find((option) => option.value === value);
    return selectedStaffMember ? selectedStaffMember.viewValue : 'Search client directory';
  }

  displayAttorney(value, options): string {
    const selectedStaffMember = options.find((option) => option.value === value);
    return selectedStaffMember ? selectedStaffMember.viewValue : 'Search attorneys';
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
    this._modalRef.close(data);
  }

  selectEvent(item: any, controlName: string) {
    this.caseForm.patchValue({[controlName]: item});
    this.caseForm.updateValueAndValidity();
  }

  setLegalArea(legalArea: LegalArea) {
    this.selectedLegalArea = legalArea;
    this.selectEvent(legalArea.id, 'legal_area_id');
  }

  trackById(index, item) {
    return item.id;
  }
  
  openAddClient() {
    this._modalService.create({
      epContent: AddClientComponent,
      epOkText: 'Add client',
      epCancelText: 'Cancel',
      epMaxWidth: '36rem',
      epAutofocus: null,
      epOnOk: (componentInstance) => {
        this._clientService.createClient(componentInstance.clientForm.value).subscribe(response => {
          this.selectEvent(response.id, 'client_id');
          this.clientId = response.id;
        });
      }
    });
  }

  setPhoneNumber(id: number) {
    const client = this.clients.find((c) => c.id === id);

    if (client.phone && client.phone.length) {
      this.chatToTextNumber.setValue(client.phone.replace('+1', ''));
    } else {
      this.chatToTextNumber.setValue('');
    }
    this.enableChatToText = true;
    this.chatToTextNumber.addValidators([Validators.required]);
    this.chatToTextNumber.updateValueAndValidity();
  }

  toggleChatToText() {
    this.enableChatToText = !this.enableChatToText;

    if (this.enableChatToText) {
      this.chatToTextNumber.addValidators([Validators.required]);
    } else {
      this.chatToTextNumber.removeValidators([Validators.required]);
    }
    this.chatToTextNumber.updateValueAndValidity();
  }

  onSubmit() {
    this.close({matter: this.caseForm.value, note: this.note, chatToTextNumber: this.chatToTextNumber.valid && this.chatToTextNumber});
  }
}
