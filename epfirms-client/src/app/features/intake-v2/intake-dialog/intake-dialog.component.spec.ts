import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeDialogComponent } from './intake-dialog.component';

describe('IntakeDialogComponent', () => {
  let component: IntakeDialogComponent;
  let fixture: ComponentFixture<IntakeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntakeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
