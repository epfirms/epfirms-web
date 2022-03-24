import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointeesComponent } from './appointees.component';

describe('AppointeesComponent', () => {
  let component: AppointeesComponent;
  let fixture: ComponentFixture<AppointeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
