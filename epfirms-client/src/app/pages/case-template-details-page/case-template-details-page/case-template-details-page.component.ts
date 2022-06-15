import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Staff } from '@app/core/interfaces/staff';
import {
  caseTemplateLawCategories,
  CaseTemplateLawCategory,
} from '@app/features/case-template/enums/case-template-law-category';
import { FirmTemplateTaskFile } from '@app/features/case-template/interfaces/firm-template-task-file';
import {
  AssigneeGroup,
  TemplateTaskAssignee,
} from '@app/features/case-template/interfaces/template-task-assignee';
import { CaseTemplateCommunityService } from '@app/features/case-template/services/case-template-community.service';
import { CaseTemplateService } from '@app/features/case-template/services/case-template.service';
import { firmRoleOptions, FirmStaffRole } from '@app/features/firm-staff/enums/firm-staff-role';
import { ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';
import { EpModalService } from '@app/shared/modal/modal.service';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { USAState } from '@app/shared/utils/us-states/typings';
import { AwsService } from '@app/shared/_services/aws.service';
import { selectRouteParams } from '@app/store/router.selectors';
import { HotToastService } from '@ngneat/hot-toast';
import { Store } from '@ngrx/store';
import {
  concatMap,
  filter,
  forkJoin,
  from,
  iif,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-case-template-details-page',
  templateUrl: './case-template-details-page.component.html',
  styleUrls: ['./case-template-details-page.component.scss'],
})
export class CaseTemplateDetailsPageComponent implements OnInit {
  public staff$: Observable<Staff[]>;

  templateForm: FormGroup = this._formBuilder.group({
    template_name: ['', Validators.required],
    law_category: [CaseTemplateLawCategory.OTHER, Validators.required],
    state_category: ['', Validators.required],
    firm_template_tasks: this._formBuilder.array([]),
  });

  originalValues;

  staffMembers: Staff[];

  filteredStaffMembers: TemplateTaskAssignee[];

  firmRoles: FirmStaffRole[] = firmRoleOptions;

  filteredFirmRoles: TemplateTaskAssignee[];

  assigneeGroups: AssigneeGroup[] = [];

  filteredAssigneeGroups: AssigneeGroup[];

  selectedCaseTemplate$: Observable<any> = this.store.select(selectRouteParams).pipe(
    filter((params) => params.id),
    switchMap((params) => {
      if (params.id === 'new') {
        return of({
          id: null,
          template_name: '',
          law_category: 'other',
          state_category: '',
          firm_template_tasks: [],
        });
      }
      return this._caseTemplateService.getOne(params.id);
    }),
    map((template) => {
      this.originalValues = template;
      return this._formBuilder.group({
        id: [template.id],
        template_name: [template.template_name, Validators.required],
        law_category: [template.law_category, Validators.required],
        state_category: [template.state_category, Validators.required],
        firm_template_tasks: [template.firm_template_tasks],
      });
    }),
  );

  public usaStates: USAState[] = usaStatesFull;

  public caseTemplateLawCategories: CaseTemplateLawCategory[] = caseTemplateLawCategories;

  constructor(
    private store: Store,
    private _caseTemplateService: CaseTemplateService,
    private _caseTemplateCommunityService: CaseTemplateCommunityService,
    private _toastService: HotToastService,
    private _modalService: EpModalService,
    private _formBuilder: FormBuilder,
    private _awsService: AwsService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.selectedCaseTemplate$.subscribe((t) => {
      this.templateForm = t;
    });
  }

  share(): void {
    this._modalService.create({
      epContent: ConfirmDialogComponent,
      epOkText: 'Confirm',
      epCancelText: 'Cancel',
      epAutofocus: null,
      epComponentParams: {
        title: 'Create community template',
        body: 'A copy of this template will be created and shared with other users in the case template community.',
      },
      epOnOk: () => {
        this._caseTemplateCommunityService.create(this.templateForm.value).subscribe(() => {
          this._toastService.success('Successfully created community template');
        });
      },
    });
  }

  saveChanges() {
    const templateId = this.templateForm.get('id').value;
    const template = this.templateForm.value;
    const templateTasks: Observable<any> = from(this.templateForm.get('firm_template_tasks').value);
    if (templateId) {
      this._caseTemplateService
        .update(templateId, template)
        .pipe(
          tap(() => {
            forkJoin(
              this.saveTaskDeletions(
                this.originalValues.firm_template_tasks,
                this.templateForm.get('firm_template_tasks').value,
              ),
            ).subscribe();
          }),
          // Observable stream of tasks to be updated.
          mergeMap(() => templateTasks.pipe(map((task) => ({ ...task, template_id: templateId })))),
          concatMap((task) => iif(() => task.id, this.updateTask(task), this.createTask(task))),
          map((task) => {
            const filesToUpload = task.firm_template_task_files.map((file) =>
              this.saveTaskFile(task.id, file),
            );
            return filesToUpload;
          }),
          concatMap((filesToUpload) => forkJoin(filesToUpload)),
        )
        .subscribe({
          complete: () => {
            const toast = this._toastService.success('Successfully update template');

            toast.afterClosed.subscribe(() => {
              this._router.navigate(['..'], { relativeTo: this._route });
            });
          },
        });
    } else {
      this._caseTemplateService
        .create(template)
        .pipe(
          // Observable stream of tasks to be created.
          mergeMap((createdTemplate) =>
            templateTasks.pipe(map((task) => ({ ...task, template_id: createdTemplate.id }))),
          ),
          // Create single task.
          concatMap((task) => this.createTask(task)),
          // Map the task's files to an array of observables.
          map((task) => {
            const filesToUpload = task.firm_template_task_files.map((file) =>
              this.saveTaskFile(task.id, file),
            );
            return filesToUpload;
          }),
          concatMap((filesToUpload) => forkJoin(filesToUpload)),
        )
        .subscribe({
          complete: () => {
            const toast = this._toastService.success('Successfully created template');

            toast.afterClosed.subscribe(() => {
              this._router.navigate(['..'], { relativeTo: this._route });
            });
          },
        });
    }
  }

  createTask(task) {
    return this._caseTemplateService.createTask(task.template_id, task).pipe(
      map((createdTask) => ({
        id: createdTask.id,
        firm_template_task_files: task.firm_template_task_files,
      })),
    );
  }

  updateTask(task) {
    return this._caseTemplateService.updateTask(task.id, task).pipe(
      map(() => ({
        id: task.id,
        firm_template_task_files: task.firm_template_task_files,
      })),
    );
  }

  private saveTaskDeletions(tasks, changes) {
    const deletedTasks = tasks.filter((task) => {
      return !changes.some((changedTask) => changedTask.id === task.id);
    });

    return deletedTasks.map((task) => this._caseTemplateService.deleteTask(task.id));
  }

  private saveTaskFile(taskId: number, file) {
    return this._caseTemplateService.getTaskFileUploadURL(file.name, file.description).pipe(
      concatMap((res) =>
        this._awsService.uploadfileAWSS3(res.url, file.description, file.file).pipe(
          map(() => ({
            name: file.name,
            description: file.description,
            key: res.key,
          })),
        ),
      ),
      concatMap((taskFile: FirmTemplateTaskFile) =>
        this._caseTemplateService.createTaskFile(taskId, taskFile),
      ),
    );
  }
}
