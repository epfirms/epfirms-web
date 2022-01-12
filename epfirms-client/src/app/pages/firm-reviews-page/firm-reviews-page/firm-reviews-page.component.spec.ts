import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmReviewsPageComponent } from './firm-reviews-page.component';

describe('FirmReviewsPageComponent', () => {
  let component: FirmReviewsPageComponent;
  let fixture: ComponentFixture<FirmReviewsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmReviewsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmReviewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
