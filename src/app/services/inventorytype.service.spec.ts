import { TestBed } from '@angular/core/testing';

import { InventorytypeService } from './inventorytype.service';

describe('InventorytypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventorytypeService = TestBed.get(InventorytypeService);
    expect(service).toBeTruthy();
  });
});
