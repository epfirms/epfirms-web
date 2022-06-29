import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmBillingMainComponent } from './firm-billing-main.component';

describe('FirmBillingMainComponent', () => {
  let component: FirmBillingMainComponent;
  let fixture: ComponentFixture<FirmBillingMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmBillingMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmBillingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
