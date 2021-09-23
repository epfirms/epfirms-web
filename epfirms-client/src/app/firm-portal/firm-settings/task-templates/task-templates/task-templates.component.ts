import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-templates',
  templateUrl: './task-templates.component.html',
  styleUrls: ['./task-templates.component.scss']
})
export class TaskTemplatesComponent implements OnInit {

  constructor() { }

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
  }

}
