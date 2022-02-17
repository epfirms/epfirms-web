import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupFlowComponent } from './setup-flow.component';

describe('SetupFlowComponent', () => {
  let component: SetupFlowComponent;
  let fixture: ComponentFixture<SetupFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
