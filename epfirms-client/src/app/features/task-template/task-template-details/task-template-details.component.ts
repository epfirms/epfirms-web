import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { MatterTask } from '@app/core/interfaces/matter-task';
import { Staff } from '@app/core/interfaces/staff';
import { TemplateTask } from '@app/core/interfaces/template-task';
import { Observable } from 'rxjs';
import { DialogRef } from '@ngneat/dialog';
import { LegalAreaService } from '@app/firm-portal/_services/legal-area-service/legal-area.service';
import { LegalArea } from '@app/core/interfaces/legal-area';

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
  templateName = "";

  templateTasks: any[] = [];

  staff$: Observable<Staff[]>;
  
  constructor(private staffService: StaffService, private dialogRef: DialogRef) {
    this.staff$ = staffService.entities$;
    if (dialogRef.data) {
      const {template_name, firm_template_tasks}  = dialogRef.data;
      this.templateName = template_name;
      this.templateTasks = [...firm_template_tasks];
    }
  }

  addTemplateTask(): void {
    this.templateTasks.push({
      user_id: null,
      task_description: '',
      no_of_days_from_start_date: null
    });
  }

  removeTemplateTask(taskIndex: number): void {
    console.log(taskIndex)
    this.templateTasks.splice(taskIndex, 1);
  }

  save() {
    this.close({
      template: {
        template_name: this.templateName,
      },
      tasks: this.templateTasks
    });
  }

  close(data?: any) {
    this.dialogRef.close(data);
  }

  setAssignee(event, index) {
    this.templateTasks[index].user_id = event;
  }

  setDescription(event, index) {
    this.templateTasks[index].task_description = event;
  }

}
