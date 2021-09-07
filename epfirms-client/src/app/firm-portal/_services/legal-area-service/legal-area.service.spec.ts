import { TestBed } from '@angular/core/testing';

import { LegalAreaService } from './legal-area.service';

describe('LegalAreaService', () => {
  let service: LegalAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
