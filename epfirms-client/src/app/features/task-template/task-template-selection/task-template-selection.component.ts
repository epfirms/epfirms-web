import { Component, OnInit } from '@angular/core';
import { TaskTemplateService } from '@app/features/task-template/services/task-template.service';
import { MatterTask } from '@app/core/interfaces/matter-task';
import { DialogRef } from '@ngneat/dialog';
import { IAngularMyDpOptions } from 'angular-mydatepicker';

@Component({
  selector: 'app-task-template-selection',
  templateUrl: './task-template-selection.component.html',
  styleUrls: ['./task-template-selection.component.scss']
})
export class TaskTemplateSelectionComponent implements OnInit {
  MS_IN_DAY = 86400000;

  taskTemplates = [];

  selectedTemplate;

  startDate: Date;

  options: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'mmm d, yyyy',
    alignSelectorRight: true
  };

  constructor(
    private _taskTemplateService: TaskTemplateService,
    private _dialogRef: DialogRef
  ) { }

  ngOnInit(): void {
    this._taskTemplateService.get().subscribe(templates => {
      this.taskTemplates = templates;
    });
  }

  selectTemplate(template) {
    this.selectedTemplate = template;
  }

  setDate(value): void {
    this.startDate = value.singleDate.jsDate;
  }

  submit() {
    const tasks = this.formatTasks(this.selectedTemplate.firm_template_tasks);
    this.close(tasks);
  }

  close(data?: any) {
    this._dialogRef.close(data);
  }

  private formatTasks(tasks): MatterTask[] {
    return tasks.map(t => ({
      name: t.name,
      due: this.addDaysToDate(this.startDate, t.no_of_days_from_start_date).toString(),
      assignee_id: t.user_id
    }));
  }

  private addDaysToDate(date: Date, numberOfDays: number): Date {
    return new Date(date.getTime() + (numberOfDays * this.MS_IN_DAY));
  };
}
