import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatConversationButtonComponent } from './chat-conversation-button.component';

describe('ChatConversationButtonComponent', () => {
  let component: ChatConversationButtonComponent;
  let fixture: ComponentFixture<ChatConversationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatConversationButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatConversationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
