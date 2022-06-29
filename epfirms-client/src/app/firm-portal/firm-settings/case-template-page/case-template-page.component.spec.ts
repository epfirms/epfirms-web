import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTemplatePageComponent } from './case-template-page.component';

describe('CaseTemplatePageComponent', () => {
  let component: CaseTemplatePageComponent;
  let fixture: ComponentFixture<CaseTemplatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTemplatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTemplatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
