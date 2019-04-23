import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPersonContainerComponent } from './chat-person-container.component';

describe('ChatPersonContainerComponent', () => {
  let component: ChatPersonContainerComponent;
  let fixture: ComponentFixture<ChatPersonContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatPersonContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPersonContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
