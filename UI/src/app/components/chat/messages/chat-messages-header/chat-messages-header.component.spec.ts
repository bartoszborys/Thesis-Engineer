import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessagesHeaderComponent } from './chat-messages-header.component';

describe('ChatMessagesHeaderComponent', () => {
  let component: ChatMessagesHeaderComponent;
  let fixture: ComponentFixture<ChatMessagesHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessagesHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessagesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
