import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacyAutocompleteComponent } from './legacy-autocomplete.component';

describe('LegacyAutocompleteComponent', () => {
  let component: LegacyAutocompleteComponent;
  let fixture: ComponentFixture<LegacyAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegacyAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegacyAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
