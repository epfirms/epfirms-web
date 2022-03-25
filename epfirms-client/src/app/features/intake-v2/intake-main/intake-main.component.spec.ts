import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeMainComponent } from './intake-main.component';

describe('IntakeMainComponent', () => {
  let component: IntakeMainComponent;
  let fixture: ComponentFixture<IntakeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntakeMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
