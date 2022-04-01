import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmIntakeViewerComponent } from './firm-intake-viewer.component';

describe('FirmIntakeViewerComponent', () => {
  let component: FirmIntakeViewerComponent;
  let fixture: ComponentFixture<FirmIntakeViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmIntakeViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmIntakeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
