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
    private _modalService: EpModalService,
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
    // this._modalService.create({
    //   epContent: CaseTemplateDetailsComponent,
    //   epOkText: 'Add template',
    //   epCancelText: 'Cancel',
    //   epAutofocus: null,
    //   epMaxWidth: '56rem',
    //   epOnOk: (componentInstance) => {
    //     this._caseTemplateService.create(componentInstance.template).subscribe((newTemplate) => {
    //       componentInstance.template.firm_template_tasks.forEach((task) => {
    //         this._caseTemplateService.createTask(newTemplate.id, task).subscribe((newTask) => {
    //           task.firm_template_task_files.forEach((file) => {
    //             this.saveTaskFile(newTask.id, file);
    //           });
    //         });
    //       });
    //     });
    //   }
    // });
  }
}
