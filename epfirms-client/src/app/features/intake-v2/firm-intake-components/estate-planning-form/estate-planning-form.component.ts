import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EstatePlanningQuestions } from '@app/core/interfaces/EstatePlanningQuestions';
import { SpecificRequests } from '@app/core/interfaces/SpecificRequests';
import { EstatePlanningService } from '../../services/estate-planning.service';
import { ExcludedChildrenService } from '../../services/excluded-children.service';
import { SpecificRequestsService } from '../../services/specific-requests.service';
import { ExcludedChildren } from '@app/core/interfaces/ExcludedChildren';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';

@Component({
  selector: 'app-estate-planning-form',
  templateUrl: './estate-planning-form.component.html',
  styleUrls: ['./estate-planning-form.component.scss'],
})
export class EstatePlanningFormComponent implements OnInit {
  @Input() matter;
  @Input() client;

  form: EstatePlanningQuestions;

  //array of the specific requests
  specificRequests: SpecificRequests[] = [];
  excludedChildren: ExcludedChildren[] = [];
  children = [];

  hasSpouse: boolean = false;

  property_distribution_choices = [
    {checked: false, value: "To SPOUSE, then to descendants."},

    {checked: false, value: "To SPOUSE, then equally to the beneficiaries."},
    {checked: false, value: "To SPOUSE, then various % to the beneficiaries."},

    {checked: false, value: "All to SPOUSE, then to one beneficiary."},
    {checked: false, value: "To DESCENDENTS equally."},
    {checked: false, value: "EQUAL shares to the beneficiaries."},
    {checked: false, value: "VARIOUS % to the beneficiaries."},
    
    {checked: false, value: "To ONE beneficairy."},
    {checked: false, value: "Other distribution."},
  ]

  
  package_selection_choices = [
    {checked: false, label: "Custom Plan", value: "Draft a unique plant for client."},

    {checked: false, label: "Will Only", value: "Only Last Will & Testament."},
    {checked: false, label: "POA Package", value: "FPOA, MPOA, HIPAA< Guardianship & Living Will"},
    {checked: false, label: "Transfer Deed Package", value: "Transfer on Death Deed or Lady-Bird Deed"},
    {checked: false, label: "Estate Planning Package", value: "Will + POA Package + Transfer Deed Package"},
    {checked: false, label: "Living Trust Package", value: "Living Trust, Assignment of Property, Deed, Bill of Sale, Certificate of Trust + Estate Planning Package Documents."},
    {checked: false, label: "Long Term Care Package", value: "Long-Term Care Plan and Documents + Living Trust Package + Estate Planning Package Documents."},
    {checked: false, label: "Income Tax Planning Package", value: "Income Tax Planning + Long Term Care Package + Living Trust Package = Estate Planning Package Documents."},
    {checked: false, label: "Business & Estate Planning Package", value: "Business Planning + Income Tax Planning + Long-Term Care Package + Living Trust Package + Estate Planning Package Documents."},
  ]

  constructor(
    private estatePlanningService: EstatePlanningService,
    private specificRequestsService: SpecificRequestsService,
    private excludedChildrenService: ExcludedChildrenService,
    private familyMemberService: FamilyMemberService,
  ) {}

  ngOnInit(): void {
    this.form = new EstatePlanningQuestions(this.client.id, this.matter.id);
    this.loadEstateForm();
    this.loadSpecificRequests();
    this.loadFamilyMembers();
    this.loadExcludedChildren();
  }

  submit(): void {
    this.submitEstateForm();
    this.submitSpecificRequests();
    this.submitExcludedChildren();
  }

  submitEstateForm(): void {
    
    this.parsePropertyDistribution();
    this.parsePackageSelection();
    this.estatePlanningService.upsertEstatePlanningQuestions(this.form).subscribe((res) => {
      
    });
  }

  private parsePropertyDistribution() : void {
    
    if (this.property_distribution_choices.filter((choice) => choice.checked).length > 0) {
      this.form.property_distribution_selection = this.property_distribution_choices.filter((choice) => choice.checked)[0].value;
    }
  }

  private parsePackageSelection() : void {
    if (this.package_selection_choices.filter((choice) => choice.checked).length > 0) {
      this.form.package_selection = this.package_selection_choices.filter((choice) => choice.checked)[0].label;
    }
  }

  submitSpecificRequests(): void {
    this.specificRequests.forEach((specificRequest) => {
      this.specificRequestsService.upsertSpecificRequest(specificRequest).subscribe((res) => {
        
      });
    });
  }

  deleteExcludedChild(excludedChild: ExcludedChildren): void {
    this.excludedChildrenService.deleteExcludedChildren(excludedChild).subscribe((res) => {
      
      this.excludedChildren = this.excludedChildren.filter(
        (child) => child.id !== excludedChild.id,
      );
    });
  }

  submitExcludedChildren(): void {
    this.excludedChildren.forEach((excludedChild) => {
      this.excludedChildrenService.upsertExcludedChildren(excludedChild).subscribe((res) => {
        
      });
    });
  }

  loadFamilyMembers(): void {
    this.familyMemberService.getByUserId(this.client.id).subscribe((res) => {
      
      this.children = res.filter((familyMember) =>
        familyMember.family_member.relationship_type.includes('child'),
      );
      
      this.checkForSpouse(res);
    });
  }

  checkForSpouse(familyMembers): void {
    if (familyMembers.length > 0) {
      familyMembers.forEach((familyMember) => {
        if (familyMember.family_member.relationship_type === 'spouse') {
          this.hasSpouse = true;
        }
      });
    }
  }

  loadExcludedChildren(): void {
    this.excludedChildrenService.getExcludedChildren(this.matter.id).subscribe((res) => {
      
      this.excludedChildren = res;
    });
  }

  loadSpecificRequests(): void {
    this.specificRequestsService.getSpecificRequests(this.matter.id).subscribe((res) => {
      if (res.length !== 0) {

      this.specificRequests = res;
      }
    });
  }

  deleteSpecificRequest(specificRequest: SpecificRequests): void {
    this.specificRequestsService.deleteSpecificRequest(specificRequest).subscribe((res) => {
      this.specificRequests = this.specificRequests.filter(
        (request) => request.id !== specificRequest.id,
      );
    });
  }

  loadEstateForm(): void {
    this.estatePlanningService.getEstatePlanningQuestions(this.matter.id).subscribe((res) => {
      
      if (res.length !== 0) {
        this.form = res[0];
        this.parsePropertyDistributionChoice(this.form.property_distribution_selection);
        this.parsePackageSelectionChoice(this.form.package_selection);
      }
    });
  }

  private parsePropertyDistributionChoice(propertyDistributionChoice: string): void {
    this.property_distribution_choices.forEach((choice) => {
      if (choice.value === propertyDistributionChoice) {
        choice.checked = true;
      } else {
        choice.checked = false;
      }
    });
  }

  private parsePackageSelectionChoice(packageSelectionChoice: string): void {
    this.package_selection_choices.forEach((choice) => {
      if (choice.label === packageSelectionChoice) {
        choice.checked = true;
      } else {
        choice.checked = false;
      }
    });
  }


  addExcludedChild(): void {
    this.excludedChildren.push(new ExcludedChildren(this.matter.id));
  }

  addSpecificRequest(): void {
    this.specificRequests.push(new SpecificRequests(this.matter.id));
  }

}
