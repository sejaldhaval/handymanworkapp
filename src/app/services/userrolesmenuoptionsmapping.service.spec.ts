import { TestBed } from '@angular/core/testing';

import { UserrolesmenuoptionsmappingService } from './userrolesmenuoptionsmapping.service';

describe('UserrolesmenuoptionsmappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserrolesmenuoptionsmappingService = TestBed.get(UserrolesmenuoptionsmappingService);
    expect(service).toBeTruthy();
  });
});
