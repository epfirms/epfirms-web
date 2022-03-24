import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmPersonalInformationComponent } from './firm-personal-information.component';

describe('FirmPersonalInformationComponent', () => {
  let component: FirmPersonalInformationComponent;
  let fixture: ComponentFixture<FirmPersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmPersonalInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
