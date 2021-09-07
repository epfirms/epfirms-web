import { TestBed } from '@angular/core/testing';

import { MatterTaskService } from './matter-task.service';

describe('MatterTaskService', () => {
  let service: MatterTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatterTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
