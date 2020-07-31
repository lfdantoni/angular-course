import { TestBed } from '@angular/core/testing';

import { LoggerDevelopmentService } from './logger-development.service';

describe('LoggerDevelopmentService', () => {
  let service: LoggerDevelopmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerDevelopmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
