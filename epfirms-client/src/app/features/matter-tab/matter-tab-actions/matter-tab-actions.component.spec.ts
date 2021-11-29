import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterTabActionsComponent } from './matter-tab-actions.component';

describe('MatterTabActionsComponent', () => {
  let component: MatterTabActionsComponent;
  let fixture: ComponentFixture<MatterTabActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatterTabActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterTabActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
