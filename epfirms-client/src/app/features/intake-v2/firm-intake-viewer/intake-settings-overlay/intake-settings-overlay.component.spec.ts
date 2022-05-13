import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeSettingsOverlayComponent } from './intake-settings-overlay.component';

describe('IntakeSettingsOverlayComponent', () => {
  let component: IntakeSettingsOverlayComponent;
  let fixture: ComponentFixture<IntakeSettingsOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntakeSettingsOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeSettingsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
