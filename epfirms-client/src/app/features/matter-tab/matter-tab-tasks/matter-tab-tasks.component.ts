import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { TaskTemplateSelectionComponent } from '@app/features/task-template/task-template-selection/task-template-selection.component';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { Matter } from '@app/core/interfaces/matter';
import { MatterTask } from '@app/core/interfaces/matter-task';
import { Staff } from '@app/core/interfaces/staff';
import { DialogService } from '@ngneat/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-matter-tab-tasks',
  templateUrl: './matter-tab-tasks.component.html',
  styleUrls: ['./matter-tab-tasks.component.scss']
})
export class MatterTabTasksComponent implements OnInit {
  @Input()
  get matter() {
    return this._matter;
  }
  set matter(value: Matter) {
    this._matter = value;
  }

  private _matter: Matter;

  staff$: Observable<Staff[]>;

  staffList: Staff[];

  @ViewChildren('taskName') taskNames;

  constructor(
    private _matterService: MatterService,
    private _staffService: StaffService,
    private _dialog: DialogService
  ) {
    this.staff$ = _staffService.entities$;
  }

  ngOnInit(): void {
    this.staff$.subscribe(res => {
      this.staffList = res;
    });
  }

  trackByIndex(index, item) {
    return item.id;
  }

  createMatterTask(matterId: number): void {
    const task: MatterTask = {
      matter_id: matterId
    };

    this._matterService.addMatterTask(task).subscribe();
  }

  updateTask(task, property, value) {
    let taskChanges = {
      ...task,
      [property]: value
    };

    console.log("VALUE", value, property);
    // add logic for adding a bill automatically
    if (property === "completed" && value === true) {
      console.log("TASK", task);

      let hourlyRate = this.staffList.filter(staff => staff.id == task.assignee_id)[0].firms[0].firm_employee.hourly_rate;
      console.log(hourlyRate);
      let bill = {
        matter_id: task.matter_id,
        hours: task.hours,
        description: task.name,
        track_time_for: task.assignee_id,
        type: "0",
        billing_type: "hourly",
        payment_type: "private pay",
        date: new Date(),
        amount: task.hours * hourlyRate
      }
      this._matterService.createBillOrPayment(bill).subscribe();
    }

    this._matterService.updateMatterTask(taskChanges).subscribe();
  }

  deleteTask(taskId) {
    this._matterService.deleteMatterTask(taskId).subscribe();
  }

  openTaskTemplateDialog(): void {
    const taskTemplateDialog = this._dialog.open(TaskTemplateSelectionComponent, {
      size: 'lg'
    });

    taskTemplateDialog.afterClosed$.subscribe((templateTasks) => {
      if (templateTasks && templateTasks.length) {
        this.applyTemplateTasks(templateTasks, this.matter.id);
      }
    });
  }

  private applyTemplateTasks(templateTasks, matterId: number): void {
    templateTasks.forEach((t) => {
      t.matter_id = matterId;

      this._matterService.addMatterTask(t).subscribe();
    });
  }
}
