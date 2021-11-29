import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterTabSidebarComponent } from './matter-tab-sidebar.component';

describe('MatterTabSidebarComponent', () => {
  let component: MatterTabSidebarComponent;
  let fixture: ComponentFixture<MatterTabSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatterTabSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterTabSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
