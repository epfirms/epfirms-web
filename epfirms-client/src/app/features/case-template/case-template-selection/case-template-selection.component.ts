import { Component, OnInit } from '@angular/core';
import { CaseTemplateService } from '@app/features/case-template/services/case-template.service';
import { MatterTask } from '@app/core/interfaces/matter-task';
import { DialogRef } from '@ngneat/dialog';
import { IAngularMyDpOptions } from 'angular-mydatepicker';

@Component({
  selector: 'app-case-template-selection',
  templateUrl: './case-template-selection.component.html',
  styleUrls: ['./case-template-selection.component.scss'],
})
export class CaseTemplateSelectionComponent implements OnInit {
  MS_IN_DAY = 86400000;

  caseTemplates = [];

  selectedTemplate;

  startDate: Date;

  options: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'mmm d, yyyy',
    alignSelectorRight: true,
  };

  constructor(private _caseTemplateService: CaseTemplateService, private _dialogRef: DialogRef) {}

  ngOnInit(): void {
    this._caseTemplateService.get().subscribe((templates) => {
      this.caseTemplates = templates;
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
    return tasks.map((t) => {
      // Get an employee based on the specified user_id or firm_role
      const assigneeId: number | null = t.firm_role_id && !t.user_id ? this.getAssigneeIdFromRole(t.firm_role_id) : t.user_id;

      return {
        name: t.name,
        due: this.addDaysToDate(this.startDate, t.no_of_days_from_start_date).toString(),
        assignee_id: assigneeId,
        matter_task_files: [...t.firm_template_task_files],
      };
    });
  }

  private getAssigneeIdFromRole(firm_role_id: number): number | null {
    const attorneyId = this._dialogRef.data.attorney_id;
    // TODO: Find the team member under the attorney with the specified role. If none exist, return null.
    return 0;
  }

  private addDaysToDate(date: Date, numberOfDays: number): Date {
    return new Date(date.getTime() + numberOfDays * this.MS_IN_DAY);
  }
}
