import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmSettingsComponent } from './firm-settings.component';

describe('FirmSettingsComponent', () => {
  let component: FirmSettingsComponent;
  let fixture: ComponentFixture<FirmSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
