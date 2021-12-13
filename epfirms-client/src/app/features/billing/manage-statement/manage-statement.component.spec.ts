import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStatementComponent } from './manage-statement.component';

describe('ManageStatementComponent', () => {
  let component: ManageStatementComponent;
  let fixture: ComponentFixture<ManageStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
