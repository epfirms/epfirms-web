import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatterTabsService } from '@app/firm-portal/_services/matter-tabs-service/matter-tabs.service';
import { MatterTaskService } from '@app/firm-portal/_services/matter-task-service/matter-task.service';
import { MatterTab } from '@app/core/interfaces/matter-tab';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {


  constructor(public _matterTabsService: MatterTabsService) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

}
