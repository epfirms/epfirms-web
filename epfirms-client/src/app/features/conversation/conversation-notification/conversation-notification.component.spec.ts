import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationNotificationComponent } from './conversation-notification.component';

describe('ConversationNotificationComponent', () => {
  let component: ConversationNotificationComponent;
  let fixture: ComponentFixture<ConversationNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
