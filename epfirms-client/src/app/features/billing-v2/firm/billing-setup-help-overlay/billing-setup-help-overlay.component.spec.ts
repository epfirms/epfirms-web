import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingSetupHelpOverlayComponent } from './billing-setup-help-overlay.component';

describe('BillingSetupHelpOverlayComponent', () => {
  let component: BillingSetupHelpOverlayComponent;
  let fixture: ComponentFixture<BillingSetupHelpOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingSetupHelpOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingSetupHelpOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
