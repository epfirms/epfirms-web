import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointeeTableComponent } from './appointee-table.component';

describe('AppointeeTableComponent', () => {
  let component: AppointeeTableComponent;
  let fixture: ComponentFixture<AppointeeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointeeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
