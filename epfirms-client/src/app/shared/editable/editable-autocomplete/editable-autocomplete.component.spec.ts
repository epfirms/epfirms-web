import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableAutocompleteComponent } from './editable-autocomplete.component';

describe('EditableAutocompleteComponent', () => {
  let component: EditableAutocompleteComponent;
  let fixture: ComponentFixture<EditableAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
