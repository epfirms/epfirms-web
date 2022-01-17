import { TestBed } from '@angular/core/testing';

import { LegalInsuranceService } from './legal-insurance.service';

describe('LegalInsuranceService', () => {
  let service: LegalInsuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalInsuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
