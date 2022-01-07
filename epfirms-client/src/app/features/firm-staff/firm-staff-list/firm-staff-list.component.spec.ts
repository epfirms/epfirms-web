import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmStaffListComponent } from './firm-staff-list.component';

describe('FirmStaffListComponent', () => {
  let component: FirmStaffListComponent;
  let fixture: ComponentFixture<FirmStaffListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmStaffListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmStaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
