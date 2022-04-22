import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssetService } from '@app/client-portal/_services/asset-service/asset.service';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { Asset } from '@app/core/interfaces/asset';
import { createMask } from '@ngneat/input-mask';

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
  ) {}

  ngOnInit(): void {
  }
  
  


  
  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }

  
}
