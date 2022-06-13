import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmDetailsPageComponent } from './firm-details-page.component';

describe('FirmDetailsPageComponent', () => {
  let component: FirmDetailsPageComponent;
  let fixture: ComponentFixture<FirmDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
