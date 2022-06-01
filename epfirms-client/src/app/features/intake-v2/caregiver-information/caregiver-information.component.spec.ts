import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverInformationComponent } from './caregiver-information.component';

describe('CaregiverInformationComponent', () => {
  let component: CaregiverInformationComponent;
  let fixture: ComponentFixture<CaregiverInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaregiverInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
