import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubscriptionOverlayComponent } from './create-subscription-overlay.component';

describe('CreateSubscriptionOverlayComponent', () => {
  let component: CreateSubscriptionOverlayComponent;
  let fixture: ComponentFixture<CreateSubscriptionOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubscriptionOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubscriptionOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
