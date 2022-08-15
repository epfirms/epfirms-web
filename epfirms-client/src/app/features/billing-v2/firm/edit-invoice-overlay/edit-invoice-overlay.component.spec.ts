import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvoiceOverlayComponent } from './edit-invoice-overlay.component';

describe('EditInvoiceOverlayComponent', () => {
  let component: EditInvoiceOverlayComponent;
  let fixture: ComponentFixture<EditInvoiceOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInvoiceOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInvoiceOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
