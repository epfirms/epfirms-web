import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSmsButtonComponent } from './task-sms-button.component';

describe('TaskSmsButtonComponent', () => {
  let component: TaskSmsButtonComponent;
  let fixture: ComponentFixture<TaskSmsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskSmsButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSmsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
