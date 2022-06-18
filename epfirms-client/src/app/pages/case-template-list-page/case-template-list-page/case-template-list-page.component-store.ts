/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  caseTemplateLawCategories,
  CaseTemplateLawCategory,
} from '@app/features/case-template/enums/case-template-law-category';
import { CaseTemplateService } from '@app/features/case-template/services/case-template.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { of, map } from 'rxjs';

export interface TemplateCategoryGroup {
  name: string;
  templates: any[];
}

export interface CaseTemplateListPageState {
  categoryGroups: TemplateCategoryGroup[];
}

@Injectable()
export class CaseTemplateListPageComponentStore extends ComponentStore<CaseTemplateListPageState> {
  constructor(private _route: ActivatedRoute, private _caseTemplateService: CaseTemplateService) {
    super({ categoryGroups: [] });
  }

  readonly categoryGroups$ = this.select((state) => state.categoryGroups);

  readonly setCategoryGroups = this.updater((state, categoryGroups: TemplateCategoryGroup[]) => ({
    ...state,
    categoryGroups,
  }));

  readonly loadCategoryGroups = this.effect(() => {
    return this._caseTemplateService.getAll().pipe(
      map((templates) => {
        const lawCategories: CaseTemplateLawCategory[] = [...caseTemplateLawCategories];
        const categoryGroups: TemplateCategoryGroup[] = [];

        lawCategories.forEach((category) => {
          const matchingTemplates = templates.filter(
            (template) => template.law_category === category,
          );
          categoryGroups.push({ name: category, templates: matchingTemplates });
        });

        /** Sort categories with 0 templates to the end. */
        const sortedCategoryGroups = categoryGroups.sort((a, b) => {
          if (!a.templates.length) {
            return 1;
          }
          if (!b.templates.length) {
            return -1;
          }
          return 0;
        });

        return sortedCategoryGroups;
      }),
      tapResponse(
        (templates: TemplateCategoryGroup[]) => {
          return this.setCategoryGroups(templates);
        },
        () => of([]),
      ),
    );
  });
}
