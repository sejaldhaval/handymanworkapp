import { TestBed } from '@angular/core/testing';

import { MaintenanceservicestatusService } from './maintenanceservicestatus.service';

describe('MaintenanceservicestatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaintenanceservicestatusService = TestBed.get(MaintenanceservicestatusService);
    expect(service).toBeTruthy();
  });
});
