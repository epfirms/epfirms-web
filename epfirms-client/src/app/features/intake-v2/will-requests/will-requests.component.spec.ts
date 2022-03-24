import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WillRequestsComponent } from './will-requests.component';

describe('WillRequestsComponent', () => {
  let component: WillRequestsComponent;
  let fixture: ComponentFixture<WillRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WillRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WillRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
