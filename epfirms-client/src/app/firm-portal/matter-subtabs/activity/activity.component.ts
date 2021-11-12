import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatterActivityService } from '@app/shared/_services/matter-activity-service/matter-activity.service';
import { Matter } from '@app/core/interfaces/matter';
import { MatterActivity } from '@app/core/interfaces/matter-activity';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit, OnDestroy {
  //Input binding from parent
  @Input()
  get matter() {
    return this._matter;
  }
  set matter(value: Matter) {
    this._matter = value;
  };

  private _matter: Matter;

  activitiesSubscription: Subscription;

  // observable list of matter activities
  activities$ : Observable<MatterActivity[]>;
  constructor(
    private _matterActivityService : MatterActivityService,
  ) { }

  ngOnInit(): void {
    this.activities$ = this._matterActivityService.getAllByMatterId(this._matter.id)
    this.activitiesSubscription = this.activities$.subscribe();
  }

  ngOnDestroy(): void {
    this.activitiesSubscription.unsubscribe();
  }

}
