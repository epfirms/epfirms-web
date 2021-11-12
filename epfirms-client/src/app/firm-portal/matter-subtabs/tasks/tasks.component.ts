import { Component, Input, ViewChildren } from '@angular/core';
import { TaskTemplateSelectionComponent } from '@app/features/task-template/task-template-selection/task-template-selection.component';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { Matter } from '@app/core/interfaces/matter';
import { MatterTask } from '@app/core/interfaces/matter-task';
import { Staff } from '@app/core/interfaces/staff';
import { DialogService } from '@ngneat/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  @Input()
  get matter() {
    return this._matter;
  }
  set matter(value: Matter) {
    this._matter = value;
  }

  private _matter: Matter;

  staff$: Observable<Staff[]>;

  @ViewChildren('taskName') taskNames;

  constructor(
    private _matterService: MatterService,
    private _staffService: StaffService,
    private _dialog: DialogService
  ) {
    this.staff$ = _staffService.entities$;
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
