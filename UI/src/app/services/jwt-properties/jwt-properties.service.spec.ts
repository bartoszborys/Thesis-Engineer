import { TestBed } from '@angular/core/testing';

import { JwtPropertiesService } from './jwt-properties.service';

describe('JwtPropertiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JwtPropertiesService = TestBed.get(JwtPropertiesService);
    expect(service).toBeTruthy();
  });
});
