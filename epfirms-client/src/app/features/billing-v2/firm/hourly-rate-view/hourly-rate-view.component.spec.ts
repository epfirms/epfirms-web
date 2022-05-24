import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyRateViewComponent } from './hourly-rate-view.component';

describe('HourlyRateViewComponent', () => {
  let component: HourlyRateViewComponent;
  let fixture: ComponentFixture<HourlyRateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyRateViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyRateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
