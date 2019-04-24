import { TestBed } from '@angular/core/testing';

import { MaintenanceissuestatusService } from './maintenanceissuestatus.service';

describe('MaintenanceissuestatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaintenanceissuestatusService = TestBed.get(MaintenanceissuestatusService);
    expect(service).toBeTruthy();
  });
});
