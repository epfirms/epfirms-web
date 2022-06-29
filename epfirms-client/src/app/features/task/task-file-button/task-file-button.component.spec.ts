import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFileButtonComponent } from './task-file-button.component';

describe('TaskFileButtonComponent', () => {
  let component: TaskFileButtonComponent;
  let fixture: ComponentFixture<TaskFileButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFileButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFileButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
