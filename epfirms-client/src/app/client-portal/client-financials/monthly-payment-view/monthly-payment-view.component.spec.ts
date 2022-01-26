import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyPaymentViewComponent } from './monthly-payment-view.component';

describe('MonthlyPaymentViewComponent', () => {
  let component: MonthlyPaymentViewComponent;
  let fixture: ComponentFixture<MonthlyPaymentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyPaymentViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyPaymentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
