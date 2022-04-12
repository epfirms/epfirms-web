import { TestBed } from '@angular/core/testing';

import { EstatePlanningService } from './estate-planning.service';

describe('EstatePlanningService', () => {
  let service: EstatePlanningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstatePlanningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
