import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenInformationComponent } from './children-information.component';

describe('ChildrenInformationComponent', () => {
  let component: ChildrenInformationComponent;
  let fixture: ComponentFixture<ChildrenInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildrenInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
