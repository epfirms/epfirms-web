import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInvoiceOverlayComponent } from './create-invoice-overlay.component';

describe('CreateInvoiceOverlayComponent', () => {
  let component: CreateInvoiceOverlayComponent;
  let fixture: ComponentFixture<CreateInvoiceOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInvoiceOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInvoiceOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
