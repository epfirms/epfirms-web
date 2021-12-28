import { TestBed } from '@angular/core/testing';

import { MatterBillingSettingsService } from './matter-billing-settings.service';

describe('MatterBillingSettingsService', () => {
  let service: MatterBillingSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatterBillingSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
