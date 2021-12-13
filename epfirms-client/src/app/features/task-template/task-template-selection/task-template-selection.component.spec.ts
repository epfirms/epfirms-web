import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTemplateSelectionComponent } from './task-template-selection.component';

describe('TaskTemplateSelectionComponent', () => {
  let component: TaskTemplateSelectionComponent;
  let fixture: ComponentFixture<TaskTemplateSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTemplateSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTemplateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
