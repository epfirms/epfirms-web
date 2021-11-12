import { Component, Input, OnInit } from '@angular/core';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { AwsService } from '@app/shared/_services/aws.service';
import { Staff } from '@app/core/interfaces/staff';

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
  ) { }

  ngOnInit(): void {
  }

  close() {
  }

  deleteStaff(){
    this._staffService.delete(this.staff.id).subscribe(res => {
      this._awsService.deleteStaff(this.staff).subscribe();
    });
  }

}
