import { TestBed } from '@angular/core/testing';

import { TemplateTaskService } from './template-task.service';

describe('TemplateTaskService', () => {
  let service: TemplateTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
