import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPersonTileComponent } from './chat-person-tile.component';

describe('ChatPersonTileComponent', () => {
  let component: ChatPersonTileComponent;
  let fixture: ComponentFixture<ChatPersonTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatPersonTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPersonTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
