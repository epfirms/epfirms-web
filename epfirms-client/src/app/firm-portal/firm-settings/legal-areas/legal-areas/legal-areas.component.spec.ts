import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalAreasComponent } from './legal-areas.component';

describe('LegalAreasComponent', () => {
  let component: LegalAreasComponent;
  let fixture: ComponentFixture<LegalAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
