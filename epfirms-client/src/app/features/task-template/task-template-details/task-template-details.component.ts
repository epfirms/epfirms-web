import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { Staff } from '@app/core/interfaces/staff';
import { Observable } from 'rxjs';
import { DialogRef, DialogService } from '@ngneat/dialog';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { FirmTaskTemplate } from '../interfaces/firm-task-template';
import { TaskTemplateLawCategory, taskTemplateLawCategories } from '../enums/task-template-law-category';
import { USAState } from '@app/shared/utils/us-states/typings';
import { FirmTemplateTaskFile } from '../interfaces/firm-template-task-file';
import { TaskTemplateService } from '../services/task-template.service';

@Component({
  selector: 'app-task-template-details',
  templateUrl: './task-template-details.component.html',
  styleUrls: ['./task-template-details.component.scss'],
  host: {
    'class': 'flex flex-col flex-auto'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskTemplateDetailsComponent {
  public template: FirmTaskTemplate = {
    template_name: '',
    law_category: TaskTemplateLawCategory.OTHER,
    state_category: '',
    firm_template_tasks: []
  };

  public staff$: Observable<Staff[]>;

  public usaStates: USAState[] = usaStatesFull;

  public taskTemplateLawCategories: TaskTemplateLawCategory[] = taskTemplateLawCategories;
  
  constructor(private staffService: StaffService, private dialogRef: DialogRef, private _taskTemplateService: TaskTemplateService, private _dialogService: DialogService) {
    this.staff$ = staffService.entities$;

    if (dialogRef.data) {
      const { template }  = dialogRef.data;
      this.template = Object.assign({}, template);
      // Deep clone tasks -- needed for change comparison in task-template-list
      this.template.firm_template_tasks = [...template.firm_template_tasks];
    }
  }

  addTemplateTask(): void {
    this.template.firm_template_tasks.push({
      user_id: null,
      name: '',
      no_of_days_from_start_date: null,
      firm_template_task_files: [],
      duration_minutes: null
    });
  }

  removeTemplateTask(taskIndex: number): void {
    this.template.firm_template_tasks.splice(taskIndex, 1);
  }

  save() {
    this.close({
      template: this.template,
      tasks: this.template.firm_template_tasks
    });
  }

  close(data?: any) {
    this.dialogRef.close(data);
  }

  setAssignee(event, index) {
    this.template.firm_template_tasks[index].user_id = event;
  }

  setDescription(event, index) {
    this.template.firm_template_tasks[index].name = event;
  }

  attachFilesToTask(files: FileList, taskIndex: number) {
    const file: File = files[0];

    const taskFile: FirmTemplateTaskFile = {
      name: file.name,
      description: file.type,
      file: file
    };

    this.template.firm_template_tasks[taskIndex].firm_template_task_files.push(taskFile);
  }

  editTaskFile(fileId: number) {}

  deleteTaskFile(fileId: number, taskIndex: number) {
    if (this.template.firm_template_tasks[taskIndex].id) {
      const deleteDialogRef = this._dialogService.confirm({
        title: `Remove task file`,
        body: `Are you sure you want to remove this file? This action cannot be undone.`
      });
  
      deleteDialogRef.afterClosed$.subscribe((confirmed) => {
        if (confirmed) {
          if (fileId) {
            this._taskTemplateService.deleteTaskFile(fileId).subscribe();
          }
          this.template.firm_template_tasks[taskIndex].firm_template_task_files = this.template.firm_template_tasks[taskIndex].firm_template_task_files.filter(t => t.id !== fileId);
        }
      });
    }
  }
}
