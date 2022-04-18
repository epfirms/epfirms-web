import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReporterModalComponent } from './bug-reporter-modal.component';

describe('BugReporterModalComponent', () => {
  let component: BugReporterModalComponent;
  let fixture: ComponentFixture<BugReporterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugReporterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReporterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
