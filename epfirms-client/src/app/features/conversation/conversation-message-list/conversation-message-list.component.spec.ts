import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationMessageListComponent } from './conversation-message-list.component';

describe('ConversationMessageListComponent', () => {
  let component: ConversationMessageListComponent;
  let fixture: ComponentFixture<ConversationMessageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationMessageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
