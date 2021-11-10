import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTemplateDetailsComponent } from './task-template-details.component';

describe('TaskTemplateDetailsComponent', () => {
  let component: TaskTemplateDetailsComponent;
  let fixture: ComponentFixture<TaskTemplateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTemplateDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTemplateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
