import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmPortalComponent } from './firm-portal.component';

describe('FirmPortalComponent', () => {
  let component: FirmPortalComponent;
  let fixture: ComponentFixture<FirmPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
