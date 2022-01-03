import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingIntegrationComponent } from './billing-integration.component';

describe('BillingIntegrationComponent', () => {
  let component: BillingIntegrationComponent;
  let fixture: ComponentFixture<BillingIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingIntegrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
