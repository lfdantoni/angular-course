import { TestBed } from '@angular/core/testing';

import { SilentLoggerService } from './silent-logger.service';

describe('SilentLoggerService', () => {
  let service: SilentLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SilentLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
