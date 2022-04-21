import { TestBed } from '@angular/core/testing';

import { FinancialSummaryService } from './financial-summary.service';

describe('FinancialSummaryService', () => {
  let service: FinancialSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
