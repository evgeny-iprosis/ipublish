import { TestBed } from '@angular/core/testing';

import { ForgroundControllerService } from './forground-controller.service';

describe('ForgroundControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForgroundControllerService = TestBed.get(ForgroundControllerService);
    expect(service).toBeTruthy();
  });
});
