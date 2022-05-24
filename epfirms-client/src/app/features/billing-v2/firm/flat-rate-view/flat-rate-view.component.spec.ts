import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatRateViewComponent } from './flat-rate-view.component';

describe('FlatRateViewComponent', () => {
  let component: FlatRateViewComponent;
  let fixture: ComponentFixture<FlatRateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlatRateViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatRateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
