import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationMatterSelectModalComponent } from './conversation-matter-select-modal.component';

describe('ConversationMatterSelectModalComponent', () => {
  let component: ConversationMatterSelectModalComponent;
  let fixture: ComponentFixture<ConversationMatterSelectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationMatterSelectModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationMatterSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
