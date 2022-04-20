import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterLabelComponent } from './matter-label.component';

describe('MatterLabelComponent', () => {
  let component: MatterLabelComponent;
  let fixture: ComponentFixture<MatterLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatterLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
