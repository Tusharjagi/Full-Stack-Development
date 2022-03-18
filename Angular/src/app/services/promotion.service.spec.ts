import { TestBed } from '@angular/core/testing';

import { PromotionService } from './promotion.service';

describe('PromotionService', () => {
  let service: PromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
