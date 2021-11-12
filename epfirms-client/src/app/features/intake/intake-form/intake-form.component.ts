import { Component, Input, OnInit } from '@angular/core';
import { AppointeeService } from '@app/client-portal/_services/appointee-service/appointee.service';
import { AssetService } from '@app/client-portal/_services/asset-service/asset.service';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { ClientMatterService } from '@app/client-portal/_services/matter-service/client-matter.service';
import { EditClientComponent } from '@app/firm-portal/overlays/edit-client/edit-client.component';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { AddAppointeeComponent } from '@app/shared/add-appointee/add-appointee.component';
import { AddFamilyMemberComponent } from '@app/shared/add-family-member/add-family-member.component';
import { AddMoneyAccountComponent } from '@app/shared/add-money-account/add-money-account.component';
import { AddRealEstateComponent } from '@app/shared/add-real-estate/add-real-estate.component';
import { AddVehicleComponent } from '@app/shared/add-vehicle/add-vehicle.component';
import { UserFormModalComponent } from '@app/shared/user-form-modal/user-form-modal.component';
import { Matter } from '@app/core/interfaces/matter';
import { map } from 'rxjs/operators';
import { DialogService } from '@ngneat/dialog';

@Component({
  selector: 'app-intake-form',
  templateUrl: './intake-form.component.html',
  styleUrls: ['./intake-form.component.scss'],
})
export class IntakeFormComponent implements OnInit {
  @Input()
  set matter(data: Matter) {
    this._matter = data;
  }
  get matter() {
    return this._matter;
  }

  private _matter: Matter;

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
  };

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
  };

  assets: {
    real_estate: any;
    vehicle: any;
    money_account: any;
  } = {
    real_estate: [],
    vehicle: [],
    money_account: [],
  };

  selectedUser: any;

  constructor(
    private _assetService: AssetService,
    private _familyMemberService: FamilyMemberService,
    private _appointeeService: AppointeeService,
    private _dialogService: DialogService,
    private _matterService: MatterService,
    private _clientService: ClientService
  ) {}

  ngOnInit(): void {
      this.toggleClientIntake();
  }

  loadIntakeForm(userId: number) {
    this._assetService.getAssetsByUserId(userId).subscribe((res) => {
      this.assets = res;
    });

    this._familyMemberService
      .getByUserId(userId)
      .pipe(
        map((members) => {
          return members.reduce(
            (acc, curr) => {
              switch (curr.family_member.relationship_type) {
                case 'child':
                  acc.child = [...acc.child, curr];
                  break;
                case 'parent':
                  acc.parent = [...acc.parent, curr];
                  break;
                case 'sibling':
                  acc.sibling = [...acc.sibling, curr];
                  break;
                case 'other':
                  acc.other = [...acc.other, curr];
                  break;
              }
              return acc;
            },
            {
              child: [],
              parent: [],
              sibling: [],
              other: [],
            }
          );
        })
      )
      .subscribe(
        (res: { child: any; parent: any; sibling: any; other: any }) => {
          this.familyMembers = res;
        }
      );

    this._appointeeService
      .getByUserId(userId)
      .pipe(
        map((appointees) => {
          return appointees.reduce(
            (acc, curr) => {
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
            },
            {
              executor: [],
              trustee: [],
              dpoa: [],
              mpoa: [],
              gop: [],
              goe: [],
              gomc: [],
            }
          );
        })
      )
      .subscribe(
        (res: {
          executor: any;
          trustee: any;
          dpoa: any;
          mpoa: any;
          gop: any;
          goe: any;
          gomc: any;
        }) => {
          this.appointees = res;
        }
      );
  }

  toggleClientIntake() {
    this.selectedUser = this.matter.client;
    this.loadIntakeForm(this.selectedUser.id);
  }

  toggleSpouseIntake() {
    if (this.matter.spouse_id) {
      this.selectedUser = this.matter.spouse;
      this.loadIntakeForm(this.selectedUser.id);
    }
  }

  editUserInfo(user) {
    const editModal = this._dialogService.open(EditClientComponent, {
      data: {user: user}
    });
    editModal.afterClosed$.subscribe((data) => {
      if (data) {
        this._matterService.update({ id: this.matter.id }).subscribe();
      }
    });
  }

  addFamilyMember(userId: number, type: string): void {
    const addFamilyMemberModal = this._dialogService.open(
      AddFamilyMemberComponent,
      { data: {type} }
    );

    addFamilyMemberModal.afterClosed$.subscribe(( data ) => {
      if (data) {
        this._familyMemberService
          .addFamilyMemberForUser(userId, data)
          .subscribe(() => {
            this.loadIntakeForm(this.selectedUser.id);
          });
      }
    });
  }

  removeFamilyMember(userId: number, memberId: number) {
    this._familyMemberService
      .deleteFamilyMemberById(userId, memberId)
      .subscribe(() => {
        this.loadIntakeForm(this.selectedUser.id);
      });
  }

  addAppointee(userId: number, type: string): void {
    const addAppointeeModal = this._dialogService.open(AddAppointeeComponent, {
      data: {type},
    });

    addAppointeeModal.afterClosed$.subscribe(( data ) => {
      if (data) {
        this._appointeeService.addAppointee(userId, data).subscribe((res) => {
          this.loadIntakeForm(this.selectedUser.id);
        });
      }
    });
  }

  editAppointee(type: string, appointee: any): void {
    const appointeeData = {
      id: appointee.appointee.id,
      first_name: appointee.first_name,
      middle_name: appointee.middle_name,
      last_name: appointee.last_name,
      email: appointee.email,
      phone: appointee.phone,
      address: appointee.address,
      city: appointee.city,
      state: appointee.state,
      zip: appointee.zip,
      executor: appointee.appointee.executor,
      trustee: appointee.appointee.trustee,
      dpoa: appointee.appointee.dpoa,
      mpoa: appointee.appointee.mpoa,
      gop: appointee.appointee.gop,
      goe: appointee.appointee.goe,
      gomc: appointee.appointee.gomc,
    };
    const addAppointeeModal = this._dialogService.open(AddAppointeeComponent, {
      data: {type,
      appointeeData,
      }
    });

    addAppointeeModal.afterClosed$.subscribe(( data ) => {
      if (data) {
        const updateData = {
          appointee: {
            id: data.id,
            executor: data.executor,
            trustee: data.trustee,
            dpoa: data.dpoa,
            mpoa: data.mpoa,
            gop: data.gop,
            goe: data.goe,
            gomc: data.gomc,
          },
          user: {
            first_name: data.first_name,
            middle_name: data.middle_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            zip: data.zip,
          },
        };
        this._appointeeService
          .updateAppointee(data.id, updateData)
          .subscribe((res) => {
            this.loadIntakeForm(this.selectedUser.id);
          });
      }
    });
  }

  removeAppointee(userId: number, memberId: number) {
    this._appointeeService.deleteAppointee(userId, memberId).subscribe(() => {
      this.loadIntakeForm(this.selectedUser.id);
    });
  }

  addMoneyAccount(userId: number): void {
    const addMoneyAccountModal = this._dialogService.open(
      AddMoneyAccountComponent,
      {}
    );

    addMoneyAccountModal.afterClosed$.subscribe(( data ) => {
      if (data) {
        this._assetService.addMoneyAccount(userId, data).subscribe((res) => {
          this.loadIntakeForm(this.selectedUser.id);
        });
      }
    });
  }

  addRealEstate(userId: number): void {
    const addRealEstateModal = this._dialogService.open(
      AddRealEstateComponent,
      {}
    );

    addRealEstateModal.afterClosed$.subscribe(( data ) => {
      if (data) {
        this._assetService.addRealEstate(userId, data).subscribe((res) => {
          this.loadIntakeForm(this.selectedUser.id);
        });
      }
    });
  }

  addVehicle(userId: number): void {
    const addVehicleModal = this._dialogService.open(AddVehicleComponent, {});

    addVehicleModal.afterClosed$.subscribe(( data ) => {
      if (data) {
        this._assetService.addVehicle(userId, data).subscribe((res) => {
          this.loadIntakeForm(this.selectedUser.id);
        });
      }
    });
  }

  updateMoneyAccount(id: number, asset): void {
    const addMoneyAccountModal = this._dialogService.open(
      AddMoneyAccountComponent,
      { data: { asset } }
    );

    addMoneyAccountModal.afterClosed$.subscribe(( data ) => {
      if (data) {
        this._assetService.updateMoneyAccount(id, data).subscribe((res) => {
          this.loadIntakeForm(this.selectedUser.id);
        });
      }
    });
  }

  updateRealEstate(id: number, asset): void {
    const addRealEstateModal = this._dialogService.open(AddRealEstateComponent, {
      data: {asset},
    });

    addRealEstateModal.afterClosed$.subscribe(( data ) => {
      if (data) {
        this._assetService.updateRealEstate(id, data).subscribe((res) => {
          this.loadIntakeForm(this.selectedUser.id);
        });
      }
    });
  }

  updateVehicle(id: number, asset): void {
    const addVehicleModal = this._dialogService.open(AddVehicleComponent, {
      data: {asset},
    });

    addVehicleModal.afterClosed$.subscribe(( data ) => {
      if (data) {
        this._assetService.updateVehicle(id, data).subscribe((res) => {
          this.loadIntakeForm(this.selectedUser.id);
        });
      }
    });
  }

  deleteMoneyAccount(id: number): void {
    this._assetService.deleteMoneyAccount(id).subscribe((res) => {
      this.loadIntakeForm(this.selectedUser.id);
    });
  }

  deleteRealEstate(id: number): void {
    this._assetService.deleteRealEstate(id).subscribe((res) => {
      this.loadIntakeForm(this.selectedUser.id);
    });
  }

  deleteVehicle(id: number): void {
    this._assetService.deleteVehicle(id).subscribe((res) => {
      this.loadIntakeForm(this.selectedUser.id);
    });
  }

  addSpouseToMatter(): void {
    const spouseModal = this._dialogService.open(UserFormModalComponent, {
      data: {title: 'spouse'},
    });
    spouseModal.afterClosed$.subscribe(( data ) => {
      if (data) {
        this._clientService.createClient(data).subscribe((response) => {
          this._matterService
            .update({ id: this.matter.id, spouse_id: response.id })
            .subscribe();
        });
      }
    });
  }

  removeSpouseFromMatter(): void {
    this._matterService
      .update({ id: this.matter.id, spouse_id: null })
      .subscribe(() => {});
  }
}
