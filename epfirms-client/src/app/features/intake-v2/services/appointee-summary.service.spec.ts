import { TestBed } from '@angular/core/testing';

import { AppointeeSummaryService } from './appointee-summary.service';

describe('AppointeeSummaryService', () => {
  let service: AppointeeSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointeeSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
