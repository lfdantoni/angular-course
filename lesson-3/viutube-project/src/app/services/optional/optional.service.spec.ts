import { TestBed } from '@angular/core/testing';

import { OptionalService } from './optional.service';

describe('OptionalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OptionalService = TestBed.get(OptionalService);
    expect(service).toBeTruthy();
  });
});
