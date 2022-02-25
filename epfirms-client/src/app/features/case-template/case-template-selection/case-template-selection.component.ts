import { Component, OnInit } from '@angular/core';
import { CaseTemplateService } from '@app/features/case-template/services/case-template.service';
import { MatterTask } from '@app/core/interfaces/matter-task';
import { FirmTeamService } from '@app/features/firm-staff/services/firm-team.service';
import { EpModalRef } from '@app/shared/modal/modal-ref';

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

  members: any[] = [];

  attorney_id: number;

  constructor(private _caseTemplateService: CaseTemplateService, private _modalRef: EpModalRef, private _firmTeamService: FirmTeamService) {}

  ngOnInit(): void {
    this.updateConfig();

    this._caseTemplateService.get().subscribe((templates) => {
      this.caseTemplates = templates;
    });

    this._firmTeamService.getTeamsByOwner(this.attorney_id).subscribe(res => {
      this.members =  res.teams.length ? res.teams[0].firm_team_members : [];
    })
  }

  selectTemplate(template) {
    this.selectedTemplate = template;
    this.updateConfig();
  }

  setDate(event): void {
    this.startDate = new Date(event.target.value + 'T00:00:00');
    this.updateConfig();
  }

  updateConfig() {
    const config =this._modalRef.getConfig();
    this._modalRef.updateConfig({
      ...config,
      epOkDisabled: !(this.selectedTemplate && this.startDate)
    });
  }

  public formatTasks(): MatterTask[] {
    const tasks = this.selectedTemplate.firm_template_tasks;
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
   const teamMember = this.members.find((m) => m.firm_role_id === firm_role_id);
   return teamMember ? teamMember.firm_employee.user_id : this.attorney_id;
  }

  private addDaysToDate(date: Date, numberOfDays: number): Date {
    return new Date(date.getTime() + numberOfDays * this.MS_IN_DAY);
  }
}
