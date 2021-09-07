import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDirectoryComponent } from './client-directory.component';

describe('ClientDirectoryComponent', () => {
  let component: ClientDirectoryComponent;
  let fixture: ComponentFixture<ClientDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDirectoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
