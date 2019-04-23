import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisAddCommentComponent } from './thesis-add-comment.component';

describe('ThesisAddCommentComponent', () => {
  let component: ThesisAddCommentComponent;
  let fixture: ComponentFixture<ThesisAddCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThesisAddCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesisAddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
