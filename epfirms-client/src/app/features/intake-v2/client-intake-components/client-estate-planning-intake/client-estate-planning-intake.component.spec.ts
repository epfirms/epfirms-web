import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEstatePlanningIntakeComponent } from './client-estate-planning-intake.component';

describe('ClientEstatePlanningIntakeComponent', () => {
  let component: ClientEstatePlanningIntakeComponent;
  let fixture: ComponentFixture<ClientEstatePlanningIntakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientEstatePlanningIntakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEstatePlanningIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
