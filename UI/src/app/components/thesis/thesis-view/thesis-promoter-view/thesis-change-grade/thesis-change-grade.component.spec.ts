import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisChangeGradeComponent } from './thesis-change-grade.component';

describe('ThesisChangeGradeComponent', () => {
  let component: ThesisChangeGradeComponent;
  let fixture: ComponentFixture<ThesisChangeGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThesisChangeGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesisChangeGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
