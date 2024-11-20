import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/features/matter/matter.model';
import { EpModalRef } from '@app/shared/modal/modal-ref';
import { IntakeService } from '../../services/intake.service';

@Component({
  selector: 'app-intake-settings-overlay',
  templateUrl: './intake-settings-overlay.component.html',
  styleUrls: ['./intake-settings-overlay.component.scss'],
})
export class IntakeSettingsOverlayComponent implements OnInit {
  @Input() matter: Matter;
  @Input() intake;

  selectedIntake: string = '';

  constructor(private intakeService: IntakeService, private _modalRef: EpModalRef) {}

  ngOnInit(): void {
    this.selectedIntake = this.intake ? this.intake.type : '';
  }

  close(): void {
    this._modalRef.close();
  }

  submit(): void {
    let intake = { id: this.intake.id, status: this.intake.status, type: this.selectedIntake, matter_id: this.matter.id };
    this._modalRef.close(intake);
  }
}
