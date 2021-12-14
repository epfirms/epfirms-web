import { Component, OnInit } from '@angular/core';
import { CaseTemplateService } from '@app/features/case-template/services/case-template.service';
import { AwsService } from '@app/shared/_services/aws.service';
import { DialogService } from '@ngneat/dialog';
import { FirmTemplateTaskFile } from '../interfaces/firm-template-task-file';
import { CaseTemplateDetailsComponent } from '../case-template-details/case-template-details.component';

@Component({
  selector: 'app-case-template-list',
  templateUrl: './case-template-list.component.html',
  styleUrls: ['./case-template-list.component.scss']
})
export class CaseTemplateListComponent implements OnInit {
  caseTemplates = [];

  constructor(
    private _caseTemplateService: CaseTemplateService,
    private _dialogService: DialogService,
    private _awsService: AwsService
  ) {}

  ngOnInit(): void {
    this.loadCaseTemplates();
  }

  openAddTemplateDialog(): void {
    const ref = this._dialogService.open(CaseTemplateDetailsComponent, {
      size: 'lg',
      enableClose: false
    });

    ref.afterClosed$.subscribe((data) => {
      if (data) {
        this._caseTemplateService.create(data.template).subscribe((newTemplate) => {
          data.tasks.forEach((task) => {
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
    const ref = this._dialogService.open(CaseTemplateDetailsComponent, {
      size: 'lg',
      enableClose: false,
      data: {
        template: template
      }
    });

    ref.afterClosed$.subscribe((data) => {
      if (data) {
        this.saveTemplateChanges(template.id, data.template);
        this.saveTaskChanges(template.id, data.tasks);
        this.saveTaskDeletions(template.firm_template_tasks, data.tasks);
        this.loadCaseTemplates();
      }
    });
  }

  deleteTemplate(template) {
    const deleteDialogRef = this._dialogService.confirm({
      title: `Delete case template`,
      body: `Are you sure you want to delete ${template.template_name}? This action cannot be undone.`
    });

    deleteDialogRef.afterClosed$.subscribe((confirmed) => {
      if (confirmed) {
        this._caseTemplateService.delete(template.id).subscribe(() => {
          this.loadCaseTemplates();
        });
      }
    });
  }

  private saveTemplateChanges(templateId: number, changes) {
    this._caseTemplateService.update(templateId, changes).subscribe();
  }

  private saveTaskChanges(templateId: number, changes) {
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

  private loadCaseTemplates() {
    this._caseTemplateService.get().subscribe((templates) => {
      this.caseTemplates = templates;
    });
  }

  private saveTaskFile(taskId: number, file) {
    this._caseTemplateService.getTaskFileUploadURL(file.name, file.description).subscribe((res) => {
      const taskFile: FirmTemplateTaskFile = {
        name: file.name,
        description: file.description,
        key: res.key
      };

      this._awsService.uploadfileAWSS3(res.url, file.description, file.file).subscribe(
        () => {},
        () => {},
        () => {
          this._caseTemplateService.createTaskFile(taskId, taskFile).subscribe();
        }
      );
    });
  }
}
