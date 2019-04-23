import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPersonSearchComponent } from './chat-person-search.component';

describe('ChatPersonSearchComponent', () => {
  let component: ChatPersonSearchComponent;
  let fixture: ComponentFixture<ChatPersonSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatPersonSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPersonSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
