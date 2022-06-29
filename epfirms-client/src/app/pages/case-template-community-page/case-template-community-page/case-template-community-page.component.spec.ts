import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTemplateCommunityPageComponent } from './case-template-community-page.component';

describe('CaseTemplateCommunityPageComponent', () => {
  let component: CaseTemplateCommunityPageComponent;
  let fixture: ComponentFixture<CaseTemplateCommunityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTemplateCommunityPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTemplateCommunityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
