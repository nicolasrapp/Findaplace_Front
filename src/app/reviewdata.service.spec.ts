import { TestBed } from '@angular/core/testing';

import { ReviewdataService } from './reviewdata.service';

describe('ReviewdataService', () => {
  let service: ReviewdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
