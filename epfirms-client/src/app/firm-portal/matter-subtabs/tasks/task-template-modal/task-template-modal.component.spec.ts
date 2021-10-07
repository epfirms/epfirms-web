import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTemplateModalComponent } from './task-template-modal.component';

describe('TaskTemplateModalComponent', () => {
  let component: TaskTemplateModalComponent;
  let fixture: ComponentFixture<TaskTemplateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTemplateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTemplateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
