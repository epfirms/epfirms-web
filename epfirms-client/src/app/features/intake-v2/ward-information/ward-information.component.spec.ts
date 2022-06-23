import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardInformationComponent } from './ward-information.component';

describe('WardInformationComponent', () => {
  let component: WardInformationComponent;
  let fixture: ComponentFixture<WardInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WardInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WardInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
