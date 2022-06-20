import { TestBed } from '@angular/core/testing';

import { ClientSubscriptionService } from './client-subscription.service';

describe('ClientSubscriptionService', () => {
  let service: ClientSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
