import { TestBed } from '@angular/core/testing';

import { LoggerOptionalService } from './logger-optional.service';

describe('LoggerOptionalService', () => {
  let service: LoggerOptionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerOptionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
