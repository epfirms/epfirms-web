import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFinancialsComponent } from './client-financials.component';

describe('ClientFinancialsComponent', () => {
  let component: ClientFinancialsComponent;
  let fixture: ComponentFixture<ClientFinancialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientFinancialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFinancialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
