import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirmService } from '@app/firm-portal/_services/firm-service/firm.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { ModalRef } from '@app/modal/modal-ref';
import { Firm } from '@app/_models/firm';
import { MatterTask } from '@app/_models/matter-task';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-template-modal',
  templateUrl: './task-template-modal.component.html',
  styleUrls: ['./task-template-modal.component.scss']
})
export class TaskTemplateModalComponent implements OnInit {
  MS_IN_DAY = 86400000;

  matter;

  firm$ : Observable<Firm[]>;
  taskTemplates;

  //selected template to apply
  selectedTemplate;

  startDate: Date = new Date();
  
  options: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'mmm d, yyyy',
    alignSelectorRight: true
  };
  constructor(
    private firmService : FirmService,
    private matterService : MatterService,
    private _modalRef: ModalRef
  ) {
    this.firm$ = this.firmService.entities$;
    this.matter = _modalRef.data.matter;
   }

  ngOnInit(): void {
    this.firm$.subscribe(res => {
      this.taskTemplates = res[0].task_templates;
    });
  }

  setDate(value): void {
    this.startDate = value.singleDate.jsDate;
    console.log(value);
    console.log(this.startDate)
  }

  applyTemplate():void {
    console.log(this.selectedTemplate);
    if (this.selectedTemplate !== undefined){
      this.selectedTemplate.template_tasks.forEach(task => {
        let newTask = new MatterTask()
        newTask.name = task.task_description;
        newTask.matter_id = this.matter.id;
        console.log(this.startDate);
        console.log(task.no_of_days_from_start_date);
        console.log(this.addDaysToDate(this.startDate, task.no_of_days_from_start_date))
        newTask.due = this.addDaysToDate(this.startDate, task.no_of_days_from_start_date).toString();
        newTask.assignee_id = task.user_id;
        
        console.log("New Task", newTask);
        this.matterService.addMatterTask(newTask).subscribe(res => console.log(res));
      });
    }
    this.close();
  }

  close(data?: any) {
    this._modalRef.close(data);
  }

  addDaysToDate(date: Date, numberOfDays: number): Date {
    console.log(date);
    return new Date(date.getTime() + (numberOfDays * this.MS_IN_DAY));
  }
}
