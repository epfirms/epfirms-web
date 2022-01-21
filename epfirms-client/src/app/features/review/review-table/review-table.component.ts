import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-review-table',
  templateUrl: './review-table.component.html',
  styleUrls: ['./review-table.component.scss']
})
export class ReviewTableComponent implements OnInit {
  reviews;

  paginator: { start: number; end: number } = { start: 0, end: 15 };

  constructor(private _reviewsService: ReviewService) { }

  ngOnInit(): void {
    this._reviewsService.getAllByFirm().subscribe((res) => {
      this.reviews = res.reviews;
    });
  }

  setPagination(current: { start: number; end: number }) {
    this.paginator = current;
  }
}
