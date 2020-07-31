import { TestBed } from '@angular/core/testing';

import { LoggerModuleService } from './logger-module.service';

describe('LoggerModuleService', () => {
  let service: LoggerModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
