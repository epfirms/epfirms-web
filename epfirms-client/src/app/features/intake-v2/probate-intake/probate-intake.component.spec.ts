import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbateIntakeComponent } from './probate-intake.component';

describe('ProbateIntakeComponent', () => {
  let component: ProbateIntakeComponent;
  let fixture: ComponentFixture<ProbateIntakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbateIntakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbateIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
