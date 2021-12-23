import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMemberDialogComponent } from './staff-member-dialog.component';

describe('StaffMemberDialogComponent', () => {
  let component: StaffMemberDialogComponent;
  let fixture: ComponentFixture<StaffMemberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffMemberDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
