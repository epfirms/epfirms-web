import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationMessageItemComponent } from './conversation-message-item.component';

describe('ConversationMessageItemComponent', () => {
  let component: ConversationMessageItemComponent;
  let fixture: ComponentFixture<ConversationMessageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationMessageItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationMessageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
