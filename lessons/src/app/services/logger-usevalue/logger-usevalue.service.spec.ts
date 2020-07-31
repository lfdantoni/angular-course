import { TestBed } from '@angular/core/testing';

import { LoggerUsevalueService } from './logger-usevalue.service';

describe('LoggerUsevalueService', () => {
  let service: LoggerUsevalueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerUsevalueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
