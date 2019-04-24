import { TestBed } from '@angular/core/testing';

import { MaintenancepriorityService } from './maintenancepriority.service';

describe('MaintenancepriorityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaintenancepriorityService = TestBed.get(MaintenancepriorityService);
    expect(service).toBeTruthy();
  });
});
