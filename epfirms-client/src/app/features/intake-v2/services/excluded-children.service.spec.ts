import { TestBed } from '@angular/core/testing';

import { ExcludedChildrenService } from './excluded-children.service';

describe('ExcludedChildrenService', () => {
  let service: ExcludedChildrenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcludedChildrenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
