import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherFamilyInformationComponent } from './other-family-information.component';

describe('OtherFamilyInformationComponent', () => {
  let component: OtherFamilyInformationComponent;
  let fixture: ComponentFixture<OtherFamilyInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherFamilyInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherFamilyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
