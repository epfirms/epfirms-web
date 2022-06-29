import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-staff-page',
  templateUrl: './manage-staff-page.component.html',
  styleUrls: ['./manage-staff-page.component.scss'],
  host: {
    'class': 'flex-1 relative z-0 flex flex-col overflow-hidden'
  }
})
export class ManageStaffPageComponent {
  currentPage: "staff" | "teams" = "staff";

  changePage(page: "staff" | "teams") {
    this.currentPage = page;
  }
}