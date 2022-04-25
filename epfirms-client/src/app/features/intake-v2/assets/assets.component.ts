import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssetService } from '@app/client-portal/_services/asset-service/asset.service';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { Asset } from '@app/core/interfaces/asset';
import { createMask } from '@ngneat/input-mask';
import { FinancialSummaryService } from '../services/financial-summary.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit {
  // Input Bindings
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();
  @Input() matter;

  // client's assets
  clientAssetForm: any = {
    id: undefined,
    user_id: undefined,
    checking: '0',
    savings: '0',
    other_bank: '0',
    nc_bank: '0',
    // 401k = employer_retirement_plan
    employer_retirement_plan: '0',
    ira: '0',
    other_qualified_investment: '0',
    // nc means non countable
    nc_employer_retirement_plan: '0',
    nc_ira: '0',
    nc_other_qualified_investment: '0',
    unqualified_investment: '0',
    hard_assets: '0',
    other_unqualified_investment: '0',
    nc_unqualified_investment: '0',
    nc_hard_assets: '0',
    nc_other_unqualified_investment: '0',
    total_assets: '0',
  };

  // spouse assets

  spouseAssetForm: any = {
    id: undefined,
    user_id: undefined,
    checking: '0',
    savings: '0',
    other_bank: '0',
    nc_bank: '0',
    // 401k = employer_retirement_plan
    employer_retirement_plan: '0',
    ira: '0',
    other_qualified_investment: '0',
    // nc means non countable
    nc_employer_retirement_plan: '0',
    nc_ira: '0',
    nc_other_qualified_investment: '0',
    unqualified_investment: '0',
    hard_assets: '0',
    other_unqualified_investment: '0',
    nc_unqualified_investment: '0',
    nc_hard_assets: '0',
    nc_other_unqualified_investment: '0',
    total_assets: '0',
  };

  // joint assets

  jointAssetForm: any = {
    id: undefined,
    user_id: undefined,
    is_joint: true,
    joint_user_id: undefined,
    checking: '0',
    savings: '0',
    other_bank: '0',
    nc_bank: '0',
    // 401k = employer_retirement_plan
    employer_retirement_plan: '0',
    ira: '0',
    other_qualified_investment: '0',
    // nc means non countable
    nc_employer_retirement_plan: '0',
    nc_ira: '0',
    nc_other_qualified_investment: '0',
    unqualified_investment: '0',
    hard_assets: '0',
    other_unqualified_investment: '0',
    nc_unqualified_investment: '0',
    nc_hard_assets: '0',
    nc_other_unqualified_investment: '0',
    total_assets: '0',
  };
  // spouse of client
  spouse;

  currencyInputMask = createMask({
    prefix: '$',
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
  });

  constructor(
    private familyMemberService: FamilyMemberService,
    private financialSummaryService: FinancialSummaryService,
  ) {}

  ngOnInit(): void {
    this.loadClientAsset();
    this.loadJointAsset();
    this.loadSpouse();
  }

  private loadSpouse(): void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe((res) => {
      this.spouse = res.filter((member) => member.family_member.relationship_type === 'spouse')[0];
      if (this.spouse) {
        this.loadSpouseAsset();
        this.spouseAssetForm.user_id = this.spouse.id;
        this.jointAssetForm.joint_user_id = this.spouse.id;
      }
    });
  }

  private loadClientAsset(): void {
    this.clientAssetForm.user_id = this.matter.client.id;
    this.financialSummaryService.getWithUserId(this.matter.client.id).subscribe((res) => {
      if (res.filter((asset) => asset.is_joint === false).length > 0) {
        this.clientAssetForm = this.parseResponse(
          res.filter((asset) => asset.is_joint === false)[0],
        );
      }
    });
  }

  private loadSpouseAsset(): void {
    this.financialSummaryService.getWithUserId(this.spouse.id).subscribe((res) => {
      if (res.length > 0) {
        this.spouseAssetForm = this.parseResponse(res[0]);
      }
    });
  }

  private loadJointAsset(): void {
    this.jointAssetForm.user_id = this.matter.client.id;
    this.financialSummaryService.getWithUserId(this.matter.client.id).subscribe((res) => {
      if (res.filter((asset) => asset.is_joint === true).length > 0) {
        this.jointAssetForm = this.parseResponse(res.filter((asset) => asset.is_joint === true)[0]);
      }
    });
  }

  // method that formats the string; removes '$' and ','
  private toStringFloat(value): string {
    let formatted = value.replace(/\$/g, '');
    formatted = formatted.replace(/,/g, '');

    return formatted;

  }

  // method that parses the response and returns the object
  private parseResponse(response): any {
    const parsedResponse = {
      id: response.id,
      user_id: response.user_id,
      is_joint: response.is_joint,
      joint_user_id: response.joint_user_id,
      checking: response.checking.toString(),
      savings: response.savings.toString(),
      other_bank: response.other_bank.toString(),
      nc_bank: response.nc_bank.toString(),
      employer_retirement_plan: response.employer_retirement_plan.toString(),
      ira: response.ira.toString(),
      other_qualified_investment: response.other_qualified_investment.toString(),
      nc_employer_retirement_plan: response.nc_employer_retirement_plan.toString(),
      nc_ira: response.nc_ira.toString(),
      nc_other_qualified_investment: response.nc_other_qualified_investment.toString(),
      unqualified_investment: response.unqualified_investment.toString(),
      hard_assets: response.hard_assets.toString(),
      other_unqualified_investment: response.other_unqualified_investment.toString(),
      nc_unqualified_investment: response.nc_unqualified_investment.toString(),
      nc_hard_assets: response.nc_hard_assets.toString(),
      nc_other_unqualified_investment: response.nc_other_unqualified_investment.toString(),
      total_assets: response.total_assets.toString(),
    };
    
    return parsedResponse;
  }

  private parseAssetForm(assetForm): any {
    console.log(this.toStringFloat(assetForm.checking));
    console.log("before parsed asset form", assetForm);
    const asset = {
      id: assetForm.id,
      user_id: assetForm.user_id,
      is_joint: assetForm.is_joint,
      joint_user_id: assetForm.joint_user_id,
      checking: parseFloat(this.toStringFloat(assetForm.checking)),
      savings: parseFloat(this.toStringFloat(assetForm.savings)),
      other_bank: parseFloat(this.toStringFloat(assetForm.other_bank)),
      nc_bank: parseFloat(this.toStringFloat(assetForm.nc_bank)),
      employer_retirement_plan: parseFloat(
        this.toStringFloat(assetForm.employer_retirement_plan),
      ),
      ira: parseFloat(this.toStringFloat(assetForm.ira)),
      other_qualified_investment: parseFloat(
        this.toStringFloat(assetForm.other_qualified_investment),
      ),
      nc_employer_retirement_plan: parseFloat(
        this.toStringFloat(assetForm.nc_employer_retirement_plan),
      ),
      nc_ira: parseFloat(this.toStringFloat(assetForm.nc_ira)),
      nc_other_qualified_investment: parseFloat(
        this.toStringFloat(assetForm.nc_other_qualified_investment),
      ),
      unqualified_investment: parseFloat(this.toStringFloat(assetForm.unqualified_investment)),
      hard_assets: parseFloat(this.toStringFloat(assetForm.hard_assets)),
      other_unqualified_investment: parseFloat(
        this.toStringFloat(assetForm.other_unqualified_investment),
      ),
      nc_unqualified_investment: parseFloat(
        this.toStringFloat(assetForm.nc_unqualified_investment),
      ),
      nc_hard_assets: parseFloat(this.toStringFloat(assetForm.nc_hard_assets)),
      nc_other_unqualified_investment: parseFloat(
        this.toStringFloat(assetForm.nc_other_unqualified_investment),
      ),
      total_assets: parseFloat(this.toStringFloat(assetForm.total_assets)),
    };
    asset.total_assets =
      asset.checking +
      asset.savings +
      asset.other_bank +
      asset.nc_bank +
      asset.employer_retirement_plan +
      asset.ira +
      asset.other_qualified_investment +
      asset.nc_employer_retirement_plan +
      asset.nc_ira +
      asset.nc_other_qualified_investment +
      asset.unqualified_investment +
      asset.hard_assets +
      asset.other_unqualified_investment +
      asset.nc_unqualified_investment +
      asset.nc_hard_assets +
      asset.nc_other_unqualified_investment;

      
      console.log("after parsed asset form", asset);
    return asset;
  }

  submit(): void {
    this.upsertClientAsset();
    this.upsertSpouseAsset();
    this.upsertJointAsset();
  }

  // upsert client assets
  private upsertClientAsset(): void {
    const asset = this.parseAssetForm(this.clientAssetForm);

    this.financialSummaryService.upsert(asset).subscribe((res) => {
      this.clientAssetForm = this.parseResponse(res[0]);
    });
  }

  private upsertSpouseAsset(): void {
    const asset = this.parseAssetForm(this.spouseAssetForm);

    this.financialSummaryService.upsert(asset).subscribe((res) => {
      this.spouseAssetForm = this.parseResponse(res[0]);
    });
  }

  private upsertJointAsset(): void {
    const asset = this.parseAssetForm(this.jointAssetForm);

    this.financialSummaryService.upsert(asset).subscribe((res) => {
      this.jointAssetForm = this.parseResponse(res[0]);
    });
  }

  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }
}
