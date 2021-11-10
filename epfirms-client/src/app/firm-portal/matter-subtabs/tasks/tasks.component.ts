import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { TaskTemplateSelectionComponent } from '@app/features/task-template/task-template-selection/task-template-selection.component';
import { FirmService } from '@app/firm-portal/_services/firm-service/firm.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { ModalService } from '@app/modal/modal.service';
import { Matter } from '@app/_models/matter';
import { MatterTab } from '@app/_models/matter-tab';
import { MatterTask } from '@app/_models/matter-task';
import { Staff } from '@app/_models/staff';
import { DialogService } from '@ngneat/dialog';
import { Observable, Subscription } from 'rxjs';
import { TaskTemplateModalComponent } from './task-template-modal/task-template-modal.component';

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
  };

  private _matter: Matter;

  staff$: Observable<Staff[]>;

  @ViewChildren('taskName') taskNames;

  constructor(
    private _matterService: MatterService,
    private _staffService: StaffService,
    private _dialog: DialogService) {
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
    templateTasks.forEach(t => {
      t.matter_id = matterId;

      this._matterService.addMatterTask(t).subscribe();
    });
  }
}
