import { TestBed } from '@angular/core/testing';

import { LoggerUseClassService } from './logger-useclass.service';

describe('LoggerFormattedService', () => {
  let service: LoggerUseClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerUseClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
