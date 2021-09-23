import { Component, OnInit } from '@angular/core';
import { TaskTemplateService } from '@app/firm-portal/_services/task-template-service/task-template.service';

@Component({
  selector: 'app-task-templates',
  templateUrl: './task-templates.component.html',
  styleUrls: ['./task-templates.component.scss']
})
export class TaskTemplatesComponent implements OnInit {

  constructor(
    private taskTemplateService: TaskTemplateService
  ) { }

  //MODAL LOGIC
  isVisible: boolean = false;

  //selector state
  isSelectVisible:boolean = false;

  //TASK TEMPLATE FORM BINDINGS
  templateName: string;

  ngOnInit(): void {
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

}
