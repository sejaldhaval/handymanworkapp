import { TestBed } from '@angular/core/testing';

import { EmployeesScheduleService } from './employees-schedule.service';

describe('EmployeesScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeesScheduleService = TestBed.get(EmployeesScheduleService);
    expect(service).toBeTruthy();
  });
});
