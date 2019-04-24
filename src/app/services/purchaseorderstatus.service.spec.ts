import { TestBed } from '@angular/core/testing';

import { PurchaseorderstatusService } from './purchaseorderstatus.service';

describe('PurchaseorderstatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaseorderstatusService = TestBed.get(PurchaseorderstatusService);
    expect(service).toBeTruthy();
  });
});
