import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSmsConfirmationComponent } from './task-sms-confirmation.component';

describe('TaskSmsConfirmationComponent', () => {
  let component: TaskSmsConfirmationComponent;
  let fixture: ComponentFixture<TaskSmsConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskSmsConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSmsConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
