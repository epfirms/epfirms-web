import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterTabContentComponent } from './matter-tab-content.component';

describe('MatterTabContentComponent', () => {
  let component: MatterTabContentComponent;
  let fixture: ComponentFixture<MatterTabContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatterTabContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
