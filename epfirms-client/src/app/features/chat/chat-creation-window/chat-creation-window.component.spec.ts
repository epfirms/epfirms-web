import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCreationWindowComponent } from './chat-creation-window.component';

describe('ChatCreationWindowComponent', () => {
  let component: ChatCreationWindowComponent;
  let fixture: ComponentFixture<ChatCreationWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatCreationWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCreationWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
