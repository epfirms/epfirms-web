import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointeeFormComponent } from './appointee-form.component';

describe('AppointeeFormComponent', () => {
  let component: AppointeeFormComponent;
  let fixture: ComponentFixture<AppointeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointeeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
