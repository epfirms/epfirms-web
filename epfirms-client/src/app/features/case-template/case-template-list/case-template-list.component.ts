import { Component, Input, OnInit } from '@angular/core';
import { CaseTemplateService } from '@app/features/case-template/services/case-template.service';
import { AwsService } from '@app/shared/_services/aws.service';
import { FirmTemplateTaskFile } from '../interfaces/firm-template-task-file';
import { CaseTemplateDetailsComponent } from '../case-template-details/case-template-details.component';
import { EpModalService } from '@app/shared/modal/modal.service';
import { ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';
import { TemplateCategoryGroup } from '@app/pages/case-template-list-page/case-template-list-page/case-template-list-page.component-store';

@Component({
  selector: 'app-case-template-list',
  templateUrl: './case-template-list.component.html',
  styleUrls: ['./case-template-list.component.scss'],
})
export class CaseTemplateListComponent implements OnInit {
  @Input() templateGroups: TemplateCategoryGroup[] = [];

  constructor(
    private _caseTemplateService: CaseTemplateService,
    private _awsService: AwsService,
    private _modalService: EpModalService
  ) {}

  ngOnInit(): void {}

  openAddTemplateDialog(): void {
    this._modalService.create({
      epContent: CaseTemplateDetailsComponent,
      epOkText: 'Add template',
      epCancelText: 'Cancel',
      epAutofocus: null,
      epMaxWidth: '56rem',
      epOnOk: (componentInstance) => {
        this._caseTemplateService.create(componentInstance.template).subscribe((newTemplate) => {
          componentInstance.template.firm_template_tasks.forEach((task) => {
            this._caseTemplateService.createTask(newTemplate.id, task).subscribe((newTask) => {
              task.firm_template_task_files.forEach((file) => {
                this.saveTaskFile(newTask.id, file);
              });
            });
          });
        });
      }
    });
  }

  editTemplateDialog(template): void {
    const templateCopy =  Object.assign({}, template);
    templateCopy.firm_template_tasks = [...template.firm_template_tasks];

    this._modalService.create({
      epContent: CaseTemplateDetailsComponent,
      epOkText: 'Save changes',
      epCancelText: 'Cancel',
      epAutofocus: null,
      epMaxWidth: '56rem',
      epComponentParams: {
        template: templateCopy,
      },
      epOnOk: (componentInstance) => {
        this.saveTemplateChanges(template.id, componentInstance.template);
        this.saveTaskChanges(template.id, componentInstance.template.firm_template_tasks);
        this.saveTaskDeletions(template.firm_template_tasks, componentInstance.template.firm_template_tasks);
        // this.loadCaseTemplates();
      }
    });
  }

  deleteTemplate(template) {
    this._modalService.create({
      epContent: ConfirmDialogComponent,
      epOkText: 'Confirm',
      epCancelText: 'Cancel',
      epAutofocus: null,
      epComponentParams: {
        title: 'Delete case template',
        body: `Are you sure you want to delete ${template.template_name}? This action cannot be undone.`
      },
      epOnOk: () => {
        this._caseTemplateService.delete(template.id).subscribe(() => {
          // this.loadCaseTemplates();
        });
      }
    });
  }

  private saveTemplateChanges(templateId: number, changes) {
    this._caseTemplateService.update(templateId, changes).subscribe();
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
