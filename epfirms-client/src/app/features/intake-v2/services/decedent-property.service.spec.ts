import { TestBed } from '@angular/core/testing';

import { DecedentPropertyService } from './decedent-property.service';

describe('DecedentPropertyService', () => {
  let service: DecedentPropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecedentPropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
