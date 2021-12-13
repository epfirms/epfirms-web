import { Component, OnInit } from '@angular/core';
import { TaskTemplateService } from '@app/features/task-template/services/task-template.service';
import { AwsService } from '@app/shared/_services/aws.service';
import { DialogService } from '@ngneat/dialog';
import { FirmTemplateTaskFile } from '../interfaces/firm-template-task-file';
import { TaskTemplateDetailsComponent } from '../task-template-details/task-template-details.component';

@Component({
  selector: 'app-task-template-list',
  templateUrl: './task-template-list.component.html',
  styleUrls: ['./task-template-list.component.scss']
})
export class TaskTemplateListComponent implements OnInit {
  taskTemplates = [];

  constructor(
    private _taskTemplateService: TaskTemplateService,
    private _dialogService: DialogService,
    private _awsService: AwsService
  ) {}

  ngOnInit(): void {
    this.loadTaskTemplates();
  }

  openAddTemplateDialog(): void {
    const ref = this._dialogService.open(TaskTemplateDetailsComponent, {
      size: 'lg',
      enableClose: false
    });

    ref.afterClosed$.subscribe((data) => {
      if (data) {
        this._taskTemplateService.create(data.template).subscribe((newTemplate) => {
          data.tasks.forEach((task) => {
            this._taskTemplateService.createTask(newTemplate.id, task).subscribe((newTask) => {
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
    const ref = this._dialogService.open(TaskTemplateDetailsComponent, {
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
        this.loadTaskTemplates();
      }
    });
  }

  deleteTemplate(template) {
    const deleteDialogRef = this._dialogService.confirm({
      title: `Delete task template`,
      body: `Are you sure you want to delete ${template.template_name}? This action cannot be undone.`
    });

    deleteDialogRef.afterClosed$.subscribe((confirmed) => {
      if (confirmed) {
        this._taskTemplateService.delete(template.id).subscribe(() => {
          this.loadTaskTemplates();
        });
      }
    });
  }

  private saveTemplateChanges(templateId: number, changes) {
    this._taskTemplateService.update(templateId, changes).subscribe();
  }

  private saveTaskChanges(templateId: number, changes) {
    changes.forEach((change) => {
      if (change.id) {
        this._taskTemplateService.updateTask(change.id, change).subscribe(() => {
          change.firm_template_task_files.forEach((file) => {
            if (!file.id) {
              this.saveTaskFile(change.id, file);
            }
          });
        });
      } else {
        this._taskTemplateService.createTask(templateId, change).subscribe((newTask) => {
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
      this._taskTemplateService.deleteTask(task.id).subscribe();
    });
  }

  private loadTaskTemplates() {
    this._taskTemplateService.get().subscribe((templates) => {
      this.taskTemplates = templates;
    });
  }

  private saveTaskFile(taskId: number, file) {
    this._taskTemplateService.getTaskFileUploadURL(file.name, file.description).subscribe((res) => {
      const taskFile: FirmTemplateTaskFile = {
        name: file.name,
        description: file.description,
        key: res.key
      };

      this._awsService.uploadfileAWSS3(res.url, file.description, file.file).subscribe(
        () => {},
        () => {},
        () => {
          this._taskTemplateService.createTaskFile(taskId, taskFile).subscribe();
        }
      );
    });
  }
}
