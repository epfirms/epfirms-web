import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityCaseTemplateDetailsPageComponent } from './community-case-template-details-page.component';

describe('CommunityCaseTemplateDetailsPageComponent', () => {
  let component: CommunityCaseTemplateDetailsPageComponent;
  let fixture: ComponentFixture<CommunityCaseTemplateDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityCaseTemplateDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityCaseTemplateDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
