import { Component, OnInit } from '@angular/core';
import { FirmService } from '@app/firm-portal/_services/firm-service/firm.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { TaskTemplateService } from '@app/firm-portal/_services/task-template-service/task-template.service';
import { Firm } from '@app/_models/firm';
import { Staff } from '@app/_models/staff';
import { TemplateTask } from '@app/_models/template-task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-templates',
  templateUrl: './task-templates.component.html',
  styleUrls: ['./task-templates.component.scss']
})
export class TaskTemplatesComponent implements OnInit {

  // Firm Entities
  firm$ : Observable<Firm[]>;

  //Staff entities
  staff$: Observable<Staff[]>;

  //MODAL LOGIC
  isVisible: boolean = false;

  //selector state
  isSelectVisible:boolean = false;

  //TASK TEMPLATE FORM BINDINGS
  templateName: string;

  //tempalate tasks: used for list of tasks created on template
  templateTasks = [];

  constructor(
    private taskTemplateService: TaskTemplateService,
    private firmService : FirmService,
    private staffService : StaffService,
  ) {
    this.firm$ = firmService.entities$;
    this.staff$ = staffService.entities$;
   }



  ngOnInit(): void {
    this.staff$.subscribe(res => console.log(res))
  }

  toggleModalVisibility():void {
    this.isVisible = !this.isVisible;
  }

  toggleSelectVisibility():void {
    this.isSelectVisible = !this.isSelectVisible;
  }

  createTaskTemplate():void {
    console.log(this.templateName);

    this.taskTemplateService.create(this.templateName).subscribe(res => {
      console.log(res);
    })
  }

  createTemplateTask():void {
    let task = new TemplateTask();

    this.templateTasks.push(task);
  }

}
