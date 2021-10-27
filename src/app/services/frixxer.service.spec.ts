import { TestBed } from '@angular/core/testing';

import { FrixxerService } from './frixxer.service';

describe('FrixxerService', () => {
  let service: FrixxerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrixxerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
