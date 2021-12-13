import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTemplateListItemComponent } from './task-template-list-item.component';

describe('TaskTemplateListItemComponent', () => {
  let component: TaskTemplateListItemComponent;
  let fixture: ComponentFixture<TaskTemplateListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTemplateListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTemplateListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
