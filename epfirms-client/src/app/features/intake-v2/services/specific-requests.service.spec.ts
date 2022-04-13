import { TestBed } from '@angular/core/testing';

import { SpecificRequestsService } from './specific-requests.service';

describe('SpecificRequestsService', () => {
  let service: SpecificRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
