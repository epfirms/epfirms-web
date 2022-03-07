import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractBuilderComponent } from './contract-builder.component';

describe('ContractBuilderComponent', () => {
  let component: ContractBuilderComponent;
  let fixture: ComponentFixture<ContractBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
