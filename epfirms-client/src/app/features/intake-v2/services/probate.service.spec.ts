import { TestBed } from '@angular/core/testing';

import { ProbateService } from './probate.service';

describe('ProbateService', () => {
  let service: ProbateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProbateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
