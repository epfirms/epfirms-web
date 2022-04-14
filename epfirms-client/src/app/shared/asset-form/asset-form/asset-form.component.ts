import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AssetService } from '@app/client-portal/_services/asset-service/asset.service';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { FormSettings } from '@app/core/interfaces/FormSettings';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.scss']
})
export class AssetFormComponent implements OnInit {

  // Input bindings
  @Input() asset;
  @Input() formSettings: FormSettings;
  @Input() matter;
  // bindings that control state of dropdown
  dropdownVisible: boolean = false;

  //binding for the title at top of card
  title: string = 'TITLE GOES HERE';
  //binding for the subtitle below the title
  subtitle: string = 'SUBTITLE GOES HERE';

  // relationship types
  assetTypes = [
    'checking',
    'savings',
    'investment',
    'stocks',
    'bonds',
    'cds',
    'mutual funds',
    'promissory notes',
    'cars',
    '401k',
    'IRAs',
    'other',
    'life insurance',
    'business interest',

  ]
  // form group for the user information and to create family member relationship
  assetForm = new FormGroup({
    id: new FormControl(),
    user_id: new FormControl(),
    type: new FormControl(),
    balance: new FormControl(),
    is_joint: new FormControl(),
    institution: new FormControl(),
    beneficiary_id: new FormControl(),
  });


  familyMembers = [];


  constructor(

    private assetService : AssetService,
    private familyMemberService : FamilyMemberService
  ) {}

  ngOnInit(): void {
    this.loadFormSettings();
    this.patchForm();
    this.loadFamilyMembers();
  }

  // loads the form settings from the input
  private loadFormSettings(): void {
    this.title = this.formSettings.title;
    this.subtitle = this.formSettings.subtitle;
  }


  loadFamilyMembers(): void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe((res) => {
      
      this.familyMembers = res
      
    });
  }
  // path the asset form with the asset
  private patchForm(): void {
    this.assetForm.patchValue({
      id: this.asset.id,
      user_id: this.asset.user_id,
      type: this.asset.type,
      balance: this.asset.balance,
      is_joint: this.asset.is_joint,
      institution: this.asset.institution,
      beneficiary_id: this.asset.beneficiary_id,

    });
  }

  // method that toggles the visiblity of the dropdown
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  submit(): void {
    // submit the income
    this.subtitle = this.assetForm.value.type;
    this.toggleDropdown();
    this.assetService.addMoneyAccount(this.matter.client.id, this.assetForm.value).subscribe();
  }

}
