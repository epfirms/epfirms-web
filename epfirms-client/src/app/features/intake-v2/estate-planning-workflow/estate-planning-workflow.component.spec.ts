import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatePlanningWorkflowComponent } from './estate-planning-workflow.component';

describe('EstatePlanningWorkflowComponent', () => {
  let component: EstatePlanningWorkflowComponent;
  let fixture: ComponentFixture<EstatePlanningWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstatePlanningWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatePlanningWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
