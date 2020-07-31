import { TestBed } from '@angular/core/testing';

import { LoggerProductionService } from './logger-production.service';

describe('LoggerProductionService', () => {
  let service: LoggerProductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerProductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
