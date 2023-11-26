import { TestBed } from '@angular/core/testing';

import { PlacedataService } from './placedata.service';

describe('PlacedataService', () => {
  let service: PlacedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
