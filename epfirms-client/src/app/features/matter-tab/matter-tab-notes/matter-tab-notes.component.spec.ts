import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterTabNotesComponent } from './matter-tab-notes.component';

describe('MatterTabNotesComponent', () => {
  let component: MatterTabNotesComponent;
  let fixture: ComponentFixture<MatterTabNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatterTabNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterTabNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
