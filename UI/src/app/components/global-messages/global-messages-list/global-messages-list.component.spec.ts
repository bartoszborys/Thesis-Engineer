import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalMessagesListComponent } from './global-messages-list.component';

describe('GlobalMessagesComponent', () => {
  let component: GlobalMessagesListComponent;
  let fixture: ComponentFixture<GlobalMessagesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalMessagesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
