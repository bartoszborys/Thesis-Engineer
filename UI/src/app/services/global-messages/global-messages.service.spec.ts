import { TestBed } from '@angular/core/testing';

import { GlobalMessagesService } from './global-messages.service';

describe('GlobalMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalMessagesService = TestBed.get(GlobalMessagesService);
    expect(service).toBeTruthy();
  });
});
