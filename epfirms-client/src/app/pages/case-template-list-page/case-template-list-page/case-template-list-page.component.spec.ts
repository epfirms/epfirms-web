import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTemplateListPageComponent } from './case-template-list-page.component';

describe('CaseTemplateListPageComponent', () => {
  let component: CaseTemplateListPageComponent;
  let fixture: ComponentFixture<CaseTemplateListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTemplateListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTemplateListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
