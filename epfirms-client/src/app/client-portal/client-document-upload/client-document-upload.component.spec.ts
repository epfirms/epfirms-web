import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDocumentUploadComponent } from './client-document-upload.component';

describe('ClientDocumentUploadComponent', () => {
  let component: ClientDocumentUploadComponent;
  let fixture: ComponentFixture<ClientDocumentUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDocumentUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDocumentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
