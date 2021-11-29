import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterTabBillingComponent } from './matter-tab-billing.component';

describe('MatterTabBillingComponent', () => {
  let component: MatterTabBillingComponent;
  let fixture: ComponentFixture<MatterTabBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatterTabBillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterTabBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
