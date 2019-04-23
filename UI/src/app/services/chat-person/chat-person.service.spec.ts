import { TestBed, inject } from '@angular/core/testing';

import { ChatPersonService } from './chat-person.service';

describe('ChatPersonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatPersonService]
    });
  });

  it('should be created', inject([ChatPersonService], (service: ChatPersonService) => {
    expect(service).toBeTruthy();
  }));
});
