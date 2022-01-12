import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTemplateListComponent } from './case-template-list.component';

describe('CaseTemplateListComponent', () => {
  let component: CaseTemplateListComponent;
  let fixture: ComponentFixture<CaseTemplateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTemplateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
