import { TestBed } from '@angular/core/testing';

import { MatterActivityInterceptor } from './matter-activity.interceptor';

describe('MatterActivityInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MatterActivityInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MatterActivityInterceptor = TestBed.inject(MatterActivityInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
