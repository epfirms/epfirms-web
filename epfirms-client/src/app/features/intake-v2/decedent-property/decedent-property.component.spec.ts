import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecedentPropertyComponent } from './decedent-property.component';

describe('DecedentPropertyComponent', () => {
  let component: DecedentPropertyComponent;
  let fixture: ComponentFixture<DecedentPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecedentPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecedentPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
