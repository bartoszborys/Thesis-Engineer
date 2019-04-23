import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessagesContainerComponent } from './chat-messages-container.component';

describe('ChatMessagesContainerComponent', () => {
  let component: ChatMessagesContainerComponent;
  let fixture: ComponentFixture<ChatMessagesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessagesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessagesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
