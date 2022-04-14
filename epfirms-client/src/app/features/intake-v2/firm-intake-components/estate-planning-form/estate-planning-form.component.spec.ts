import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatePlanningFormComponent } from './estate-planning-form.component';

describe('EstatePlanningFormComponent', () => {
  let component: EstatePlanningFormComponent;
  let fixture: ComponentFixture<EstatePlanningFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstatePlanningFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatePlanningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
