import { Component, OnInit } from '@angular/core';
import { TaskTemplateService } from '@app/firm-portal/_services/task-template-service/task-template.service';
import { TemplateTaskService } from '@app/firm-portal/_services/template-task-service/template-task.service';
import { DialogService } from '@ngneat/dialog';
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
    private _templateTaskService: TemplateTaskService,
    private _dialogService: DialogService
  ) { }

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
            this._templateTaskService.create(newTemplate.id, task).subscribe(() => {
              this.loadTaskTemplates();
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
        this._templateTaskService.update(change.id, change).subscribe();
      } else {
        this._templateTaskService.create(templateId, change).subscribe();
      }
    });
  }

  private saveTaskDeletions(tasks, changes) {
    const deletedTasks = tasks.filter((task) => {
      return !changes.some((changedTask) => changedTask.id === task.id);
    });

    deletedTasks.forEach((task) => {
      this._templateTaskService.delete(task.id).subscribe();
    });
  }

  private loadTaskTemplates() {
    this._taskTemplateService.get().subscribe((templates) => {
      this.taskTemplates = templates;
    });
  }
}
