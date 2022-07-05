import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPortalSelectComponent } from './auth-portal-select.component';

describe('AuthPortalSelectComponent', () => {
  let component: AuthPortalSelectComponent;
  let fixture: ComponentFixture<AuthPortalSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthPortalSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPortalSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
