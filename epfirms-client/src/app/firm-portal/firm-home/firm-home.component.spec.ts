import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmHomeComponent } from './firm-home.component';

describe('FirmHomeComponent', () => {
  let component: FirmHomeComponent;
  let fixture: ComponentFixture<FirmHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
