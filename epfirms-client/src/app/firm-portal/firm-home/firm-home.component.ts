import { Component, OnDestroy, OnInit } from '@angular/core';
import { Client } from '@app/_models/client';
import { LegalArea } from '@app/_models/legal-area';
import { Observable, Subscription } from 'rxjs';
import { ClientService } from '../_services/client-service/client.service';
import { LegalAreaService } from '../_services/legal-area-service/legal-area.service';
import { MatterService } from '../_services/matter-service/matter.service';

@Component({
  selector: 'app-firm-home',
  templateUrl: './firm-home.component.html',
  styleUrls: ['./firm-home.component.scss'],
  host: {
    'class': 'flex-1 relative z-0 flex flex-col overflow-hidden'
  }
})
export class FirmHomeComponent implements OnInit, OnDestroy {
  taskSubscription: Subscription;
  taskCategories =  {
    overdue: {
      expanded: false,
      data: []
    },
    today: {
      expanded: false,
      data: []
    },
    later: {
      expanded: false,
      data: []
    },
    completed: {
      expanded: false,
      data: []
    }
  };

  legalAreas$: Observable<LegalArea[]>;

  clients$: Observable<Client[]>;

  constructor(
    private _matterService: MatterService,
    private _legalAreaService: LegalAreaService,
    private _clientService: ClientService
  ) {
    this.legalAreas$ = _legalAreaService.entities$;
    this.clients$ = _clientService.entities$
  }

  ngOnInit(): void {
    this.taskSubscription = this._matterService.getAssignedMatterTasks().subscribe(tasks => {
      const initialValue = {
        overdue: {
          expanded: false,
          data: []
        },
        today: {
          expanded: false,
          data: []
        },
        later: {
          expanded: false,
          data: []
        },
        completed: {
          expanded: false,
          data: []
        }
      };
      this.taskCategories = tasks.reduce((acc, taskData) => {
        if (taskData.task.completed) {
          acc.completed.data.push(taskData);
          return acc;
        }

        const taskDue = new Date(taskData.task.due);
        const today = new Date();
        if(taskDue.setHours(0,0,0,0) == today.setHours(0,0,0,0)) {
          acc.today.expanded = true;
          acc.today.data.push(taskData);
        } else if (taskDue.setHours(0,0,0,0) > today.setHours(0,0,0,0)) {
          acc.later.expanded = true;
          acc.later.data.push(taskData);
        } else if (taskDue.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {
          acc.overdue.expanded = true;
          acc.overdue.data.push(taskData);
        }
        return acc;
      }, initialValue);

      console.log(this.taskCategories);
    })
  }

  ngOnDestroy(): void {
    this.taskSubscription.unsubscribe();
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

  toggleExpand(category: string) {
    this.taskCategories[category].expanded = !this.taskCategories[category].expanded;
  }


  setLegalArea(matterId: number, legalArea: LegalArea) {
    this._matterService.update({id: matterId, legal_area_id: legalArea.id}).subscribe();
  }
}
