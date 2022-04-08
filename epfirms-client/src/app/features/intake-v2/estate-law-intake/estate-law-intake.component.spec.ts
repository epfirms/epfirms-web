import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateLawIntakeComponent } from './estate-law-intake.component';

describe('EstateLawIntakeComponent', () => {
  let component: EstateLawIntakeComponent;
  let fixture: ComponentFixture<EstateLawIntakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstateLawIntakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateLawIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
