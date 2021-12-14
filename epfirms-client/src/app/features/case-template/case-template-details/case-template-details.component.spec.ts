import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTemplateDetailsComponent } from './case-template-details.component';

describe('CaseTemplateDetailsComponent', () => {
  let component: CaseTemplateDetailsComponent;
  let fixture: ComponentFixture<CaseTemplateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTemplateDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTemplateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
