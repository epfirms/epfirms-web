import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirmService } from '@app/firm-portal/_services/firm-service/firm.service';
import { Firm } from '@app/_models/firm';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-template-modal',
  templateUrl: './task-template-modal.component.html',
  styleUrls: ['./task-template-modal.component.scss']
})
export class TaskTemplateModalComponent implements OnInit {

  @Input() isVisible: boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  firm$ : Observable<Firm[]>;
  taskTemplates;

  constructor(
    private firmService : FirmService,
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

}
