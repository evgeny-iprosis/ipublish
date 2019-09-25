import { TestBed } from '@angular/core/testing';

import { SchedulesServiceService } from './schedules-service.service';

describe('SchedulesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchedulesServiceService = TestBed.get(SchedulesServiceService);
    expect(service).toBeTruthy();
  });
});
