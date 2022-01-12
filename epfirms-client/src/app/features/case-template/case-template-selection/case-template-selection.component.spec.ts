import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTemplateSelectionComponent } from './case-template-selection.component';

describe('CaseTemplateSelectionComponent', () => {
  let component: CaseTemplateSelectionComponent;
  let fixture: ComponentFixture<CaseTemplateSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTemplateSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTemplateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
