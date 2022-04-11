import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.scss'],
  host: {
    'class': 'flex-1 relative z-0 flex flex-col overflow-hidden'
  }
})
export class ManageStaffComponent {
  currentPage: "staff" | "teams" = "staff";

  changePage(page: "staff" | "teams") {
    this.currentPage = page;
  }
}
