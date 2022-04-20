import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpouseInformationComponent } from './spouse-information.component';

describe('SpouseInformationComponent', () => {
  let component: SpouseInformationComponent;
  let fixture: ComponentFixture<SpouseInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpouseInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpouseInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
