import { Component, OnInit } from '@angular/core';
import { CaseTemplateService } from '@app/features/case-template/services/case-template.service';
import { MatterTask } from '@app/core/interfaces/matter-task';
import { DialogRef } from '@ngneat/dialog';
import { IAngularMyDpOptions, M } from 'angular-mydatepicker';
import { FirmTeamService } from '@app/features/firm-staff/services/firm-team.service';

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

  members: any[] = [];

  constructor(private _caseTemplateService: CaseTemplateService, private _dialogRef: DialogRef, private _firmTeamService: FirmTeamService) {}

  ngOnInit(): void {
    this._caseTemplateService.get().subscribe((templates) => {
      this.caseTemplates = templates;
    });

    this._firmTeamService.getTeamsByOwner(this._dialogRef.data.attorney_id).subscribe(res => {
      this.members =  res.teams.length ? res.teams[0].firm_team_members : [];
    })
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
      const assigneeId: number = t.firm_role_id && !t.user_id ? this.getAssigneeIdFromRole(t.firm_role_id) : t.user_id;

      return {
        name: t.name,
        due: this.addDaysToDate(this.startDate, t.no_of_days_from_start_date).toString(),
        assignee_id: assigneeId,
        matter_task_files: [...t.firm_template_task_files],
      };
    });
  }

  /** 
   * Gets the user id from the member on the attorney's team with a matching role.
   * If there is no team member assigned to that role, use the attorney id instead.
  */
  private getAssigneeIdFromRole(firm_role_id: number): number {
    const attorneyId: number = this._dialogRef.data.attorney_id;
   const teamMember = this.members.find((m) => m.firm_role_id === firm_role_id);
   return teamMember ? teamMember.firm_employee.user_id : attorneyId;
  }

  private addDaysToDate(date: Date, numberOfDays: number): Date {
    return new Date(date.getTime() + numberOfDays * this.MS_IN_DAY);
  }
}
