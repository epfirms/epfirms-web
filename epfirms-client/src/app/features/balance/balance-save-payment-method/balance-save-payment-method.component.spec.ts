import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSavePaymentMethodComponent } from './balance-save-payment-method.component';

describe('BalanceSavePaymentMethodComponent', () => {
  let component: BalanceSavePaymentMethodComponent;
  let fixture: ComponentFixture<BalanceSavePaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceSavePaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceSavePaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
