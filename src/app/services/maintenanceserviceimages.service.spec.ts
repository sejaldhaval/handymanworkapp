import { TestBed } from '@angular/core/testing';

import { MaintenanceserviceimagesService } from './maintenanceserviceimages.service';

describe('MaintenanceserviceimagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaintenanceserviceimagesService = TestBed.get(MaintenanceserviceimagesService);
    expect(service).toBeTruthy();
  });
});
