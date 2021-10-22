import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FirmService } from '@app/firm-portal/_services/firm-service/firm.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { MatterTabsService } from '@app/firm-portal/_services/matter-tabs-service/matter-tabs.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { ModalService } from '@app/modal/modal.service';
import { Matter } from '@app/_models/matter';
import { MatterTab } from '@app/_models/matter-tab';
import { MatterTask } from '@app/_models/matter-task';
import { Staff } from '@app/_models/staff';
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

  // bool for showing task template selection
  isTaskTemplateSelectionVisible : boolean = false;

  @ViewChildren('taskName') taskNames;

  constructor(
    private _matterTabsService: MatterTabsService,
    private _matterService: MatterService,
    private _modalService: ModalService,
    private _staffService: StaffService) {
    this.staff$ = _staffService.entities$;
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

  toggleTaskTemplateVisibility(): void {
    this._modalService.open(TaskTemplateModalComponent, {matter: this.matter});
  }
}
