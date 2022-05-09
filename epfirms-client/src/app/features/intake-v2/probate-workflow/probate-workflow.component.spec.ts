import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbateWorkflowComponent } from './probate-workflow.component';

describe('ProbateWorkflowComponent', () => {
  let component: ProbateWorkflowComponent;
  let fixture: ComponentFixture<ProbateWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbateWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbateWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
