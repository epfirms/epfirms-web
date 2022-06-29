import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePaymentMethodComponent } from './save-payment-method.component';

describe('SavePaymentMethodComponent', () => {
  let component: SavePaymentMethodComponent;
  let fixture: ComponentFixture<SavePaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavePaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
