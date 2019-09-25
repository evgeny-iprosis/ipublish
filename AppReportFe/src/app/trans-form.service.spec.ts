import { TestBed } from '@angular/core/testing';

import { TransFormService } from './trans-form.service';

describe('TransFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransFormService = TestBed.get(TransFormService);
    expect(service).toBeTruthy();
  });
});
