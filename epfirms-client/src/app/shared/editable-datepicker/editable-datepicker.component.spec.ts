import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableDatepickerComponent } from './editable-datepicker.component';

describe('EditableDatepickerComponent', () => {
  let component: EditableDatepickerComponent;
  let fixture: ComponentFixture<EditableDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableDatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
