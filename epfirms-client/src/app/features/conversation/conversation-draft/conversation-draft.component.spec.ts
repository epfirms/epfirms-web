import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationDraftComponent } from './conversation-draft.component';

describe('ConversationDraftComponent', () => {
  let component: ConversationDraftComponent;
  let fixture: ComponentFixture<ConversationDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationDraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
