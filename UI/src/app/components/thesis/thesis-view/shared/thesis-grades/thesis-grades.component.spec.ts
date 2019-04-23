import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisGradesComponent } from './thesis-grades.component';

describe('ThesisGradesComponent', () => {
  let component: ThesisGradesComponent;
  let fixture: ComponentFixture<ThesisGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThesisGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesisGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
