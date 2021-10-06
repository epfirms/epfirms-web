import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IntakeModule } from '@app/intake/intake.module';
import { Matter } from '@app/_models/matter';
import { Observable } from 'rxjs';
import { ClientMatterService } from '../_services/matter-service/client-matter.service';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent {
  matters$: Observable<Matter[]>;

  selectedIntake: Matter;

  constructor(private _clientMatterService: ClientMatterService, private _router: Router, private _activatedRoute: ActivatedRoute) {
    this.matters$ = _clientMatterService.entities$;
  }

  openIntake(matter: Matter): void {
    if (matter.matter_intake?.status !== 'complete') {
      this.selectedIntake = matter;
  }
  }

  closeIntake() {
    this.selectedIntake = undefined;
  }

  submitIntake() {
    this._clientMatterService.updateMatterIntake({id: this.selectedIntake.id, status: 'complete'}).subscribe(() => {
      this.closeIntake();
    });
  }
}
