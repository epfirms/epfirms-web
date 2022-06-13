import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceAddFundsComponent } from './balance-add-funds.component';

describe('BalanceAddFundsComponent', () => {
  let component: BalanceAddFundsComponent;
  let fixture: ComponentFixture<BalanceAddFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceAddFundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceAddFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
