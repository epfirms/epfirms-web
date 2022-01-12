import { Component, OnInit } from '@angular/core';
import { caseTemplateLawCategories } from '@app/features/case-template/enums/case-template-law-category';
import { CaseTemplateCommunityService } from '@app/features/case-template/services/case-template-community.service';
import { usaStatesFull } from '@app/shared/utils/us-states/states';

@Component({
  selector: 'app-case-template-community-table',
  templateUrl: './case-template-community-table.component.html',
  styleUrls: ['./case-template-community-table.component.scss']
})
export class CaseTemplateCommunityTableComponent implements OnInit {
  caseTemplates;

  filteredCaseTemplates;

  firmCaseTemplates;

  lawCategories = caseTemplateLawCategories;

  usaStates = usaStatesFull;

  filters = {
    'law_category': [],
    'state_category': []
  };

  collapseFilters = {
    'law_category': false,
    'state_category': false
  };

  templateCategory = 'all';

  constructor(
    private _caseTemplateCommunityService: CaseTemplateCommunityService
  ) { }

  ngOnInit(): void {
    this._caseTemplateCommunityService.get().subscribe(t => {
      this.caseTemplates = t.all;
      this.firmCaseTemplates = t.firm;
      this.selectTemplateCategory('all');
    });
  }

  changeFilter(type, value) {
    const filterIndex = this.filters[type].indexOf(value);
    if (filterIndex > -1) {
      this.filters[type].splice(filterIndex, 1);
    } else {
      this.filters[type].push(value);
    }

    this.applyFilter();
  }

  applyFilter() {
    this.filteredCaseTemplates = this.selectedTemplates.filter(template => {
      const stateFilter = this.filters.state_category.length ? this.filters.state_category.includes(template.state_category) : true;
      const lawFilter = this.filters.law_category.length ? this.filters.law_category.includes(template.law_category) : true;
      return stateFilter && lawFilter;
    });
  }

  selectTemplateCategory(category: string) {
    this.templateCategory = category;
    this.applyFilter();
  }

  get selectedTemplates() {
    return this.templateCategory === 'firm' ? this.firmCaseTemplates : this.caseTemplates;
  }
}
