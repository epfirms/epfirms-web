import { Component, OnDestroy, OnInit } from '@angular/core';
import { getYear } from 'date-fns';
import { DatepickerOptions } from 'ng2-datepicker';
import locale from 'date-fns/locale/en-US';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService } from '../_services/asset-service/asset.service';
import { ModalService } from '@app/modal/modal.service';
import { AddMoneyAccountComponent } from '@app/shared/add-money-account/add-money-account.component';
import { AddRealEstateComponent } from '@app/shared/add-real-estate/add-real-estate.component';
import { AddVehicleComponent } from '@app/shared/add-vehicle/add-vehicle.component';
import { AddAppointeeComponent } from '@app/shared/add-appointee/add-appointee.component';
import { AddFamilyMemberComponent } from '@app/shared/add-family-member/add-family-member.component';
import { FamilyMemberService } from '../_services/family-member-service/family-member.service';
import { map, take } from 'rxjs/operators';
import { AppointeeService } from '../_services/appointee-service/appointee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';
import { ClientMatterService } from '../_services/matter-service/client-matter.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';

@Component({
  selector: 'app-intake-form',
  templateUrl: './intake-form.component.html',
  styleUrls: ['./intake-form.component.scss']
})
export class IntakeFormComponent implements OnInit, OnDestroy {
  matterId: number;

  matterIntakeId: number;

  status: string;

  currentStepIndex: number = 0;

  steps = [
    {
      title: 'Basic Information',
      complete: false
    },
    {
      title: 'Family Members',
      complete: false
    },
    {
      title: 'Assets',
      complete: false
    },
    {
      title: 'Appointees',
      complete: false
    }
  ]

  clientForm: FormGroup;
  clientFormSubscription: Subscription;

  spouseForm: FormGroup;

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

  familyMembers: {
    child: any;
    parent: any;
    sibling: any;
    other: any;
  } = {
    child: [],
    parent: [],
    sibling: [],
    other: [],
  }

  appointees: {
    executor: any;
    trustee: any;
    dpoa: any;
    mpoa: any;
    gop: any;
    goe: any;
    gomc: any;
  } = {
    executor: [],
    trustee: [],
    dpoa: [],
    mpoa: [],
    gop: [],
    goe: [],
    gomc: [],
  }

  assets: {
    real_estate: any;
    vehicle: any;
    money_account: any;
  } = {
    real_estate: [],
    vehicle: [],
    money_account: []
  }
  
  constructor(
    private _router: Router,
    private _assetService: AssetService,
    private _familyMemberService: FamilyMemberService,
    private _modalService: ModalService,
    private _appointeeService: AppointeeService,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private _clientMatterService: ClientMatterService,
    private _currentUserService: CurrentUserService
  ) {
    this.route.paramMap.pipe(take(1)).subscribe(params => {
      this.matterId = parseInt(params.get('id'));
   })
  }

  clientFormInit(client): any {
    return this._fb.group({
      id: [client.id, [Validators.required]],
      first_name: [client.first_name || '', [Validators.required]],
      middle_name: [client.middle_name ||''],
      last_name: [client.last_name || '', [Validators.required]],
      dob: [client.dob ? new Date(client.dob) : null, [Validators.required]],
      phone: [client.phone || null, [Validators.required]],
      address: [client.address || null, [Validators.required]],
      city: [client.city || null, [Validators.required]],
      state: [client.state || null, [Validators.required]],
      zip: [client.zip || null, [Validators.required]],
    })
  }

  spouseFormInit(spouse): any {
    return this._fb.group({
      id: [spouse.id || null],
      first_name: [spouse.first_name || '', [Validators.required]],
      middle_name: [spouse.middle_name ||''],
      last_name: [spouse.last_name || '', [Validators.required]],
      dob: [spouse.dob ? new Date(spouse.dob) : null],
      email: [spouse.email || null, [Validators.email]],
      phone: [spouse.phone || null],
    })
  }

  ngOnInit(): void {
    this._clientMatterService.getMatterById(this.matterId).subscribe(matter => {
      this.matterIntakeId = matter.matter_intake.id;
      this.status = matter.matter_intake.status;
      this.clientForm = this.clientFormInit(matter.client);
      this.spouseForm = this.spouseFormInit(matter.spouse);
      this.clientForm.updateValueAndValidity();
      this.spouseForm.updateValueAndValidity();
    });

    this._assetService.getAll().subscribe(res => {
      this.assets = res;
    });

    this._familyMemberService.getAll().pipe(
      map(members => {
        return members.reduce((acc, curr) => {
          switch (curr.family_member.relationship_type) {
            case 'child':
              acc.child = [...acc.child, curr]
              break;
            case 'parent':
              acc.parent = [...acc.parent, curr]
              break;
            case 'sibling':
              acc.sibling = [...acc.sibling, curr]
              break;
            case 'other':
              acc.other = [...acc.other, curr]
              break;
          }
          return acc;
        }, {
          child: [],
          parent: [],
          sibling: [],
          other: [],
        })
      })
    ).subscribe((res: {
      child: any;
      parent: any;
      sibling: any;
      other: any;
    }) => {
      this.familyMembers = res;
    });

    this._appointeeService.getAll().pipe(
      map(appointees => {
        return appointees.reduce((acc, curr) => {
          if (curr.appointee.executor > 0) {
            acc.executor = [...acc.executor, curr];
          }
          if (curr.appointee.trustee > 0) {
            acc.trustee = [...acc.trustee, curr];
          }
          if (curr.appointee.dpoa > 0) {
            acc.dpoa = [...acc.dpoa, curr];
          }
          if (curr.appointee.mpoa > 0) {
            acc.mpoa = [...acc.mpoa, curr];
          }
          if (curr.appointee.gop > 0) {
            acc.gop = [...acc.gop, curr];
          }
          if (curr.appointee.goe > 0) {
            acc.goe = [...acc.goe, curr];
          }
          if (curr.appointee.gomc > 0) {
            acc.gomc = [...acc.gomc, curr];
          }
          return acc;
        }, {
          executor: [],
          trustee: [],
          dpoa: [],
          mpoa: [],
          gop: [],
          goe: [],
          gomc: [],
        })
      })
    ).subscribe((res: {
      executor: any;
      trustee: any;
      dpoa: any;
      mpoa: any;
      gop: any;
      goe: any;
      gomc: any;
    }) => {
      this.appointees = res;
    });
  }

  ngOnDestroy(): void {
    this.clientFormSubscription.unsubscribe();
  }
  addMoneyAccount(): void {
    const addMoneyAccountModal = this._modalService.open(AddMoneyAccountComponent, {});

    addMoneyAccountModal.afterClosed$.subscribe(({data}) => {
      if (data) {
        this.assets.money_account = [...this.assets.money_account, data];
      }
    })
  }

  addRealEstate(): void {
    const addRealEstateModal = this._modalService.open(AddRealEstateComponent, {});

    addRealEstateModal.afterClosed$.subscribe(({data}) => {
      if (data) {
        this.assets.real_estate = [...this.assets.real_estate, data];
      }
    })
  }

  addVehicle(): void {
    const addVehicleModal = this._modalService.open(AddVehicleComponent, {});

    addVehicleModal.afterClosed$.subscribe(({data}) => {
      if (data) {
        this.assets.vehicle = [...this.assets.vehicle, data];
      }
    })
  }

  addFamilyMember(): void {
    const addVehicleModal = this._modalService.open(AddFamilyMemberComponent, {});

    addVehicleModal.afterClosed$.subscribe(({data}) => {
      if (data) {
        if (data.relationship_type === 'child') {
          this.familyMembers.child = [...this.familyMembers.child, data];
        }
      }
    })
  }

  addAppointee(type: string): void {
    const addVehicleModal = this._modalService.open(AddAppointeeComponent, {type});

    addVehicleModal.afterClosed$.subscribe(({data}) => {
      if (data) {
        this.appointees[type] = [...this.appointees[type], data]
      }
    })
  }



  navigateBack(): void {
    this._router.navigate(['/client']);
  }

  nextStep(): void {
    if (this.currentStepIndex !== 3) {
      this.steps[this.currentStepIndex].complete = true;
      this.currentStepIndex = this.currentStepIndex + 1
    } else {
      
    }
  }

  prevStep(): void {
    this.currentStepIndex = this.currentStepIndex - 1;
  }

  submitIntake(): void {
    if (this.spouseForm.value.id) {
      this._clientMatterService.updateSpouse(this.matterId, this.spouseForm.value).subscribe();
    } else {
      this._clientMatterService.addSpouse(this.matterId, this.spouseForm.value).subscribe();
    }
    this._currentUserService.update(this.clientForm.value).subscribe(() => {
      this._clientMatterService.updateMatterIntake({id: this.matterIntakeId, status: 'complete'}).subscribe(() => {
        this.navigateBack();
      });
    });
  }
}
