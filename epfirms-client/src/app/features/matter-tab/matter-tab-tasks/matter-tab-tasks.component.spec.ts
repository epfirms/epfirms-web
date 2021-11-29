import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterTabTasksComponent } from './matter-tab-tasks.component';

describe('MatterTabTasksComponent', () => {
  let component: MatterTabTasksComponent;
  let fixture: ComponentFixture<MatterTabTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatterTabTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterTabTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
