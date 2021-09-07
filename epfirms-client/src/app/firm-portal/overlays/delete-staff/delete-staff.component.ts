import { Component, Input, OnInit } from '@angular/core';
import { OverlayService } from '@app/firm-portal/_services/overlay-service/overlay.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { AwsService } from '@app/shared/_services/aws.service';
import { Staff } from '@app/_models/staff';

@Component({
  selector: 'app-delete-staff',
  templateUrl: './delete-staff.component.html',
  styleUrls: ['./delete-staff.component.scss']
})
export class DeleteStaffComponent implements OnInit {
  @Input() staff : Staff;

  constructor(
    private _staffService: StaffService,
    private _awsService: AwsService,
    private _overlayService: OverlayService,
  ) { }

  ngOnInit(): void {
  }

  close() {
    setTimeout(() => {
      this._overlayService.clear();
    }, 300);
  }

  deleteStaff(){
    this._staffService.delete(this.staff.id).subscribe(res => {
      this._awsService.deleteStaff(this.staff).subscribe();
    });
  }

}
