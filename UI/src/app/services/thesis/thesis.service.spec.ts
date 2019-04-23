import { TestBed } from '@angular/core/testing';

import { ThesisService } from './thesis.service';

describe('ThesisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThesisService = TestBed.get(ThesisService);
    expect(service).toBeTruthy();
  });
});
