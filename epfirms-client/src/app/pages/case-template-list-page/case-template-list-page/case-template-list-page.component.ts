import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EpModalService } from '@app/shared/modal/modal.service';
import { CaseTemplateListPageComponentStore } from './case-template-list-page.component-store';

@Component({
  selector: 'app-case-template-list-page',
  templateUrl: './case-template-list-page.component.html',
  styleUrls: ['./case-template-list-page.component.scss'],
  providers: [CaseTemplateListPageComponentStore]
})
export class CaseTemplateListPageComponent implements OnInit {
  categoryGroups$ = this.componentStore.categoryGroups$;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private readonly componentStore: CaseTemplateListPageComponentStore,
  ) { }

  ngOnInit(): void {
    this.componentStore.loadCategoryGroups();
    this.categoryGroups$.subscribe(console.log)
  }

  selectCaseTemplate(id: number) {
    this._router.navigate([`${id}`], { relativeTo: this._route });
  }

  deleteCaseTemplate(id: number) {

  }

  openAddTemplateDialog(): void {
    this._router.navigate([`new`], { relativeTo: this._route });
  }
}
