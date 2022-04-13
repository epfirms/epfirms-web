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
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();

  form: EstatePlanningQuestions;

  //array of the specific requests
  specificRequests: SpecificRequests[] = [];
  excludedChildren: ExcludedChildren[] = [];
  children = [];

  hasSpouse: boolean = false;

  constructor(
    private estatePlanningService: EstatePlanningService,
    private specificRequestsService: SpecificRequestsService,
    private excludedChildrenService: ExcludedChildrenService,
    private familyMemberService: FamilyMemberService,
  ) {}

  ngOnInit(): void {
    this.form = new EstatePlanningQuestions(this.matter.client.id, this.matter.id);
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
    
    this.estatePlanningService.upsertEstatePlanningQuestions(this.form).subscribe((res) => {
      
    });
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
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe((res) => {
      
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
      }
    });
  }

  addExcludedChild(): void {
    this.excludedChildren.push(new ExcludedChildren(this.matter.id));
  }

  addSpecificRequest(): void {
    this.specificRequests.push(new SpecificRequests(this.matter.id));
  }

  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }
}
