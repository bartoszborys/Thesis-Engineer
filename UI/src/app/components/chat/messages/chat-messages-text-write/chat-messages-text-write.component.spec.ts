import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessagesTextWriteComponent } from './chat-messages-text-write.component';

describe('ChatMessagesTextWriteComponent', () => {
  let component: ChatMessagesTextWriteComponent;
  let fixture: ComponentFixture<ChatMessagesTextWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessagesTextWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessagesTextWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
