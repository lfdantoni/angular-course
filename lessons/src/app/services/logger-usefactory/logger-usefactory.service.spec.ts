import { TestBed } from '@angular/core/testing';

import { LoggerUsefactoryService } from './logger-usefactory.service';

describe('LoggerUsefactoryService', () => {
  let service: LoggerUsefactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerUsefactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
