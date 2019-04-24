import { TestBed } from '@angular/core/testing';

import { MaintenanceserviceService } from './maintenanceservice.service';

describe('MaintenanceserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaintenanceserviceService = TestBed.get(MaintenanceserviceService);
    expect(service).toBeTruthy();
  });
});
