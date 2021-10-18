import { Component } from '@angular/core';
import { Matter } from '@app/_models/matter';
import { Observable } from 'rxjs';
import { ClientMatterService } from '../_services/matter-service/client-matter.service';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss'],
})
export class CaseListComponent {
  matters$: Observable<Matter[]>;

  selectedMatter: Matter;

  constructor(
    private _clientMatterService: ClientMatterService,
  ) {
    this.matters$ = _clientMatterService.entities$;
  }

  openIntake(matter: Matter): void {
    if (matter.matter_intake_id) {
      this.selectedMatter = matter;
    }
  }

  closeIntake() {
    this.selectedMatter = undefined;
  }

  submitIntake() {
    this._clientMatterService
      .updateMatterIntake({
        id: this.selectedMatter.matter_intake_id,
        status: 'complete',
      })
      .subscribe(() => {
        this.closeIntake();
      });
  }
}
