import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-firm-reviews-page',
  templateUrl: './firm-reviews-page.component.html',
  styleUrls: ['./firm-reviews-page.component.scss'],
  host: {
    class: 'flex-1 relative z-0 flex flex-col overflow-y-auto',
  },
})
export class FirmReviewsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
