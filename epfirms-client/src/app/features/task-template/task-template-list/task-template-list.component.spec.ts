import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTemplateListComponent } from './task-template-list.component';

describe('TaskTemplateListComponent', () => {
  let component: TaskTemplateListComponent;
  let fixture: ComponentFixture<TaskTemplateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTemplateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
