import { TestBed } from '@angular/core/testing';

import { EmployeesScheduleWeekService } from './employees-schedule-week.service';

describe('EmployeesScheduleWeekService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeesScheduleWeekService = TestBed.get(EmployeesScheduleWeekService);
    expect(service).toBeTruthy();
  });
});
