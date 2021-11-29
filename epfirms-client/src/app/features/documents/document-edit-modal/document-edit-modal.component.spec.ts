import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEditModalComponent } from './document-edit-modal.component';

describe('DocumentEditModalComponent', () => {
  let component: DocumentEditModalComponent;
  let fixture: ComponentFixture<DocumentEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
