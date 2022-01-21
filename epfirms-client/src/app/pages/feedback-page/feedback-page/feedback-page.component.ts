import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.scss'],
})
export class FeedbackPageComponent {
  uid: string;

  rating: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.uid = params.uid;
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.rating = parseInt(queryParams.rating);
    });
  }
}
