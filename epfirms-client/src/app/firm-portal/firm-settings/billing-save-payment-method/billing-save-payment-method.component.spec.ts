import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingSavePaymentMethodComponent } from './billing-save-payment-method.component';

describe('BillingSavePaymentMethodComponent', () => {
  let component: BillingSavePaymentMethodComponent;
  let fixture: ComponentFixture<BillingSavePaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingSavePaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingSavePaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
