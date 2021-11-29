import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterTabUserCardComponent } from './matter-tab-user-card.component';

describe('MatterTabUserCardComponent', () => {
  let component: MatterTabUserCardComponent;
  let fixture: ComponentFixture<MatterTabUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatterTabUserCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterTabUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
