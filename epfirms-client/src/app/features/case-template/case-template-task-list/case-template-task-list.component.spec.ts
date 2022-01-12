import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTemplateTaskListComponent } from './case-template-task-list.component';

describe('CaseTemplateTaskListComponent', () => {
  let component: CaseTemplateTaskListComponent;
  let fixture: ComponentFixture<CaseTemplateTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTemplateTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTemplateTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
