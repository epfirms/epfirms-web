import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTemplatesComponent } from './case-templates.component';

describe('CaseTemplatesComponent', () => {
  let component: CaseTemplatesComponent;
  let fixture: ComponentFixture<CaseTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
