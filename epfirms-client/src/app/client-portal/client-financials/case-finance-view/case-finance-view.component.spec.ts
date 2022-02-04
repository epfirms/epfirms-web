import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFinanceViewComponent } from './case-finance-view.component';

describe('CaseFinanceViewComponent', () => {
  let component: CaseFinanceViewComponent;
  let fixture: ComponentFixture<CaseFinanceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseFinanceViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFinanceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
