import { TestBed } from '@angular/core/testing';

import { MenuoptionsService } from './menuoptions.service';

describe('MenuoptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuoptionsService = TestBed.get(MenuoptionsService);
    expect(service).toBeTruthy();
  });
});
