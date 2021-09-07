import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSelectComponent } from './login-select.component';

describe('LoginSelectComponent', () => {
  let component: LoginSelectComponent;
  let fixture: ComponentFixture<LoginSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
