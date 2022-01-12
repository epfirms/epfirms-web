import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTemplateCommunityTableComponent } from './case-template-community-table.component';

describe('CaseTemplateCommunityTableComponent', () => {
  let component: CaseTemplateCommunityTableComponent;
  let fixture: ComponentFixture<CaseTemplateCommunityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTemplateCommunityTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTemplateCommunityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
