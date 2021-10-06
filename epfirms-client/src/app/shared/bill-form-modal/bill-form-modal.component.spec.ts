import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillFormModalComponent } from './bill-form-modal.component';

describe('BillFormModalComponent', () => {
  let component: BillFormModalComponent;
  let fixture: ComponentFixture<BillFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
