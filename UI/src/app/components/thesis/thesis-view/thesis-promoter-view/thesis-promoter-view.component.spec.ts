import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisPromoterViewComponent } from './thesis-promoter-view.component';

describe('ThesisPromoterViewComponent', () => {
  let component: ThesisPromoterViewComponent;
  let fixture: ComponentFixture<ThesisPromoterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThesisPromoterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesisPromoterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
