import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSlideOverContainerComponent } from './modal-slide-over-container.component';

describe('ModalSlideOverContainerComponent', () => {
  let component: ModalSlideOverContainerComponent;
  let fixture: ComponentFixture<ModalSlideOverContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSlideOverContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSlideOverContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
