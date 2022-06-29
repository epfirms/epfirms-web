import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTemplatesPageComponent } from './contract-templates-page.component';

describe('ContractTemplatesPageComponent', () => {
  let component: ContractTemplatesPageComponent;
  let fixture: ComponentFixture<ContractTemplatesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractTemplatesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractTemplatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
