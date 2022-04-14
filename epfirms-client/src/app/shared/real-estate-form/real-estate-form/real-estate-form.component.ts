import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AssetService } from '@app/client-portal/_services/asset-service/asset.service';
import { FormSettings } from '@app/core/interfaces/FormSettings';

@Component({
  selector: 'app-real-estate-form',
  templateUrl: './real-estate-form.component.html',
  styleUrls: ['./real-estate-form.component.scss']
})
export class RealEstateFormComponent implements OnInit {

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

  // form group for the user information and to create family member relationship
  propertyForm = new FormGroup({
    id: new FormControl(),
    user_id: new FormControl(),
    full_address: new FormControl(),
    total_value: new FormControl(),
    loan_amount: new FormControl(),
    is_business: new FormControl(),
    has_mineral_rights: new FormControl()
  });
  constructor(

    private assetService : AssetService
  ) {}

  ngOnInit(): void {
    this.loadFormSettings();
    this.patchForm();
  }

  // loads the form settings from the input
  private loadFormSettings(): void {
    this.title = this.formSettings.title;
    this.subtitle = this.formSettings.subtitle;
  }

  // path the asset form with the asset
  private patchForm(): void {
    this.propertyForm.patchValue({
      id: this.asset.id,
      user_id: this.asset.user_id,
      full_address: this.asset.full_address,
      total_value: this.asset.total_value,
      loan_amount: this.asset.loan_amount,
      is_business: this.asset.is_business,
      has_mineral_rights: this.asset.has_mineral_rights
    });
  }

  // method that toggles the visiblity of the dropdown
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  submit(): void {
    // submit the income
    this.subtitle = this.propertyForm.value.type;
    this.toggleDropdown();
    this.assetService.addRealEstate(this.matter.client.id, this.propertyForm.value).subscribe();
  }
}
