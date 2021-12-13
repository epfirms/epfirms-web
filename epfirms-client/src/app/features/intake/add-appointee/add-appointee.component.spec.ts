import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppointeeComponent } from './add-appointee.component';

describe('AddAppointeeComponent', () => {
  let component: AddAppointeeComponent;
  let fixture: ComponentFixture<AddAppointeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppointeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppointeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
