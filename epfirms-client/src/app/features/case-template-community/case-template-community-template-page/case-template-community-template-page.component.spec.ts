import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTemplateCommunityTemplatePageComponent } from './case-template-community-template-page.component';

describe('CaseTemplateCommunityTemplatePageComponent', () => {
  let component: CaseTemplateCommunityTemplatePageComponent;
  let fixture: ComponentFixture<CaseTemplateCommunityTemplatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTemplateCommunityTemplatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTemplateCommunityTemplatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
