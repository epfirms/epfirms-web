import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Staff } from '@app/core/interfaces/staff';
import { caseTemplateLawCategories, CaseTemplateLawCategory } from '@app/features/case-template/enums/case-template-law-category';
import { FirmCaseTemplate } from '@app/features/case-template/interfaces/firm-case-template';
import { FirmTemplateTaskFile } from '@app/features/case-template/interfaces/firm-template-task-file';
import { AssigneeGroup, TemplateTaskAssignee } from '@app/features/case-template/interfaces/template-task-assignee';
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
import { filter, map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-case-template-details-page',
  templateUrl: './case-template-details-page.component.html',
  styleUrls: ['./case-template-details-page.component.scss']
})
export class CaseTemplateDetailsPageComponent implements OnInit {
  public staff$: Observable<Staff[]>;

  templateForm: FormGroup = this._formBuilder.group({
    template_name: ['', Validators.required],
    law_category: [CaseTemplateLawCategory.OTHER, Validators.required],
    state_category: ['', Validators.required],
    firm_template_tasks: this._formBuilder.array([])
  });

  originalValues;

  staffMembers: Staff[];

  filteredStaffMembers: TemplateTaskAssignee[];

  firmRoles: FirmStaffRole[] = firmRoleOptions;

  filteredFirmRoles: TemplateTaskAssignee[];

  assigneeGroups: AssigneeGroup[] = [];

  filteredAssigneeGroups: AssigneeGroup[];

  selectedCaseTemplate$: Observable<any> = this.store.select(selectRouteParams).pipe(
    filter(params => params.id), 
    switchMap((params) => this._caseTemplateService.getOne(params.id)),
    map((template) => {
      this.originalValues = template;
      return this._formBuilder.group({
      id: [template.id],
      template_name: [template.template_name, Validators.required],
      law_category: [template.law_category, Validators.required],
      state_category: [template.state_category, Validators.required],
      firm_template_tasks: [template.firm_template_tasks]
    })})
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
    private _awsService: AwsService
  ) {}

  ngOnInit(): void {
    this.selectedCaseTemplate$.subscribe(t => {
      this.templateForm = t;
      this.templateForm.valueChanges.subscribe(c => {
        console.log(c);
      })
    })
  }

  share(): void {
    this._modalService.create({
      epContent: ConfirmDialogComponent,
      epOkText: 'Confirm',
      epCancelText: 'Cancel',
      epAutofocus: null,
      epComponentParams: {
        title: 'Create community template',
        body: 'A copy of this template will be created and shared with other users in the case template community.'
      },
      epOnOk: () => {
        this._caseTemplateCommunityService.create(this.templateForm.value).subscribe(() => {
          this._toastService.success('Successfully created community template');
        });
      }
    });
  }

  saveChanges() {
    this.saveTemplateChanges(this.templateForm.get('id').value, this.templateForm.value);
    this.saveTaskChanges(this.templateForm.get('id').value, this.templateForm.get('firm_template_tasks').value);
    this.saveTaskDeletions(this.originalValues.firm_template_tasks, this.templateForm.get('firm_template_tasks').value);
    // this.loadCaseTemplates();
  }

  private saveTaskChanges(templateId: number, changes) {
    console.log(changes);
    changes.forEach((change) => {
      if (change.id) {
        this._caseTemplateService.updateTask(change.id, change).subscribe(() => {
          change.firm_template_task_files.forEach((file) => {
            if (!file.id) {
              this.saveTaskFile(change.id, file);
            }
          });
        });
      } else {
        this._caseTemplateService.createTask(templateId, change).subscribe((newTask) => {
          change.firm_template_task_files.forEach((file) => {
            this.saveTaskFile(newTask.id, file);
          });
        });
      }
    });
  }

  private saveTemplateChanges(templateId: number, changes) {
    this._caseTemplateService.update(templateId, changes).subscribe();
  }

  private saveTaskDeletions(tasks, changes) {
    const deletedTasks = tasks.filter((task) => {
      return !changes.some((changedTask) => changedTask.id === task.id);
    });

    deletedTasks.forEach((task) => {
      this._caseTemplateService.deleteTask(task.id).subscribe();
    });
  }

  private saveTaskFile(taskId: number, file) {
    this._caseTemplateService.getTaskFileUploadURL(file.name, file.description).subscribe((res) => {
      const taskFile: FirmTemplateTaskFile = {
        name: file.name,
        description: file.description,
        key: res.key,
      };

      this._awsService.uploadfileAWSS3(res.url, file.description, file.file).subscribe(
        () => {},
        () => {},
        () => {
          this._caseTemplateService.createTaskFile(taskId, taskFile).subscribe();
        },
      );
    });
  }
}
