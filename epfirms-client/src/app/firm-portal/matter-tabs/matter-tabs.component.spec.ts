import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterTabsComponent } from './matter-tabs.component';

describe('MatterTabsComponent', () => {
  let component: MatterTabsComponent;
  let fixture: ComponentFixture<MatterTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatterTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
