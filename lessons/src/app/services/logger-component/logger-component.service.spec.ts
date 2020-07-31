import { TestBed } from '@angular/core/testing';

import { LoggerComponentService } from './logger-component.service';

describe('LoggerComponentService', () => {
  let service: LoggerComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
