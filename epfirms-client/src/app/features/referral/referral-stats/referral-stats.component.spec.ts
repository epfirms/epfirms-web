import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralStatsComponent } from './referral-stats.component';

describe('ReferralStatsComponent', () => {
  let component: ReferralStatsComponent;
  let fixture: ComponentFixture<ReferralStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
