import { TestBed } from '@angular/core/testing';

import { MatterActivityService } from './matter-activity.service';

describe('MatterActivityService', () => {
  let service: MatterActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatterActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
