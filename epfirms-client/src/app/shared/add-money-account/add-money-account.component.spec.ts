import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoneyAccountComponent } from './add-money-account.component';

describe('AddMoneyAccountComponent', () => {
  let component: AddMoneyAccountComponent;
  let fixture: ComponentFixture<AddMoneyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoneyAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoneyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
