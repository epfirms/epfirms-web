import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmTeamListComponent } from './firm-team-list.component';

describe('FirmTeamListComponent', () => {
  let component: FirmTeamListComponent;
  let fixture: ComponentFixture<FirmTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmTeamListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
