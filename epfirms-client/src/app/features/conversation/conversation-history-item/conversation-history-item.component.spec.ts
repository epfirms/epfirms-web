import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationHistoryItemComponent } from './conversation-history-item.component';

describe('ConversationHistoryItemComponent', () => {
  let component: ConversationHistoryItemComponent;
  let fixture: ComponentFixture<ConversationHistoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationHistoryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
