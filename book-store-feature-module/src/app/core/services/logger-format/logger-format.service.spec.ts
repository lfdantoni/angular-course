import { TestBed } from '@angular/core/testing';

import { LoggerFormatService } from './logger-format.service';

describe('LoggerFormatService', () => {
  let service: LoggerFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
