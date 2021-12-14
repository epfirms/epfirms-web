import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTemplateCommunityComponent } from './case-template-community.component';

describe('CaseTemplateCommunityComponent', () => {
  let component: CaseTemplateCommunityComponent;
  let fixture: ComponentFixture<CaseTemplateCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTemplateCommunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTemplateCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
