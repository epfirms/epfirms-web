import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElderLawWorkflowComponent } from './elder-law-workflow.component';

describe('ElderLawWorkflowComponent', () => {
  let component: ElderLawWorkflowComponent;
  let fixture: ComponentFixture<ElderLawWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElderLawWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElderLawWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
