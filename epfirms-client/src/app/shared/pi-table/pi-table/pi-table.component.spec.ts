import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiTableComponent } from './pi-table.component';

describe('PiTableComponent', () => {
  let component: PiTableComponent;
  let fixture: ComponentFixture<PiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
