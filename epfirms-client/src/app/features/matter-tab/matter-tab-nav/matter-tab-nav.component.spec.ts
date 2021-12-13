import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterTabNavComponent } from './matter-tab-nav.component';

describe('MatterTabNavComponent', () => {
  let component: MatterTabNavComponent;
  let fixture: ComponentFixture<MatterTabNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatterTabNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterTabNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
