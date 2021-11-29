import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterTabActivityComponent } from './matter-tab-activity.component';

describe('MatterTabActivityComponent', () => {
  let component: MatterTabActivityComponent;
  let fixture: ComponentFixture<MatterTabActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatterTabActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterTabActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
