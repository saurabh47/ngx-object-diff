import { TestBed } from '@angular/core/testing';

import { NgxObjectDiffService } from './ngx-object-diff.service';

describe('NgxObjectDiffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxObjectDiffService = TestBed.get(NgxObjectDiffService);
    expect(service).toBeTruthy();
  });
});
