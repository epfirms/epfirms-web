import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTemplateDetailsPageComponent } from './case-template-details-page.component';

describe('CaseTemplateDetailsPageComponent', () => {
  let component: CaseTemplateDetailsPageComponent;
  let fixture: ComponentFixture<CaseTemplateDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTemplateDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTemplateDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
