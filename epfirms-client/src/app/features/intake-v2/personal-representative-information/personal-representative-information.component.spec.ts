import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalRepresentativeInformationComponent } from './personal-representative-information.component';

describe('PersonalRepresentativeInformationComponent', () => {
  let component: PersonalRepresentativeInformationComponent;
  let fixture: ComponentFixture<PersonalRepresentativeInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalRepresentativeInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalRepresentativeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
