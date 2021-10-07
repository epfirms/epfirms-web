import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirmService } from '@app/firm-portal/_services/firm-service/firm.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { Firm } from '@app/_models/firm';
import { MatterTask } from '@app/_models/matter-task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-template-modal',
  templateUrl: './task-template-modal.component.html',
  styleUrls: ['./task-template-modal.component.scss']
})
export class TaskTemplateModalComponent implements OnInit {

  @Input() isVisible: boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  @Input() matter;

  firm$ : Observable<Firm[]>;
  taskTemplates;

  //selected template to apply
  selectedTemplate;

  constructor(
    private firmService : FirmService,
    private matterService : MatterService,
  ) {
    this.firm$ = this.firmService.entities$;
   }

  ngOnInit(): void {
    this.firm$.subscribe(res => {
      this.taskTemplates = res[0].task_templates;
    });
  }

  toggleModalVisibility():void {
    this.isVisible = !this.isVisible;
    this.isVisibleChange.emit(this.isVisible);
  }

  applyTemplate():void {
    console.log(this.selectedTemplate);
    if (this.selectedTemplate !== undefined){
      this.selectedTemplate.template_tasks.forEach(task => {
        let newTask = new MatterTask()
        newTask.name = task.task_description;
        newTask.matter_id = this.matter.id;
        newTask.due = task.user_id;
        
        console.log("New Task", newTask);
        this.matterService.addMatterTask(newTask).subscribe(res => console.log(res));
      });
    }
    this.toggleModalVisibility();
  }

}
