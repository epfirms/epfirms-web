import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecedentInformationComponent } from './decedent-information.component';

describe('DecedentInformationComponent', () => {
  let component: DecedentInformationComponent;
  let fixture: ComponentFixture<DecedentInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecedentInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecedentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
