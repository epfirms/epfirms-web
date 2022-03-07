import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractEditorV2Component } from './contract-editor-v2.component';

describe('ContractEditorV2Component', () => {
  let component: ContractEditorV2Component;
  let fixture: ComponentFixture<ContractEditorV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractEditorV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractEditorV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
