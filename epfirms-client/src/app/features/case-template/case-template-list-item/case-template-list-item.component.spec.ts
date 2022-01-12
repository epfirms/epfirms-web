import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTemplateListItemComponent } from './case-template-list-item.component';

describe('CaseTemplateListItemComponent', () => {
  let component: CaseTemplateListItemComponent;
  let fixture: ComponentFixture<CaseTemplateListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTemplateListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTemplateListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
