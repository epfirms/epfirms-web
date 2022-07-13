import { TestBed } from '@angular/core/testing';

import { AppointeeService } from './appointee.service';

describe('AppointeeService', () => {
  let service: AppointeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
