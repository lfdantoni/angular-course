import { TestBed } from '@angular/core/testing';

import { DateLoggerService } from './date-logger.service';

describe('DateLoggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateLoggerService = TestBed.get(DateLoggerService);
    expect(service).toBeTruthy();
  });
});
