import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProblemComponent } from './problem.component';

describe('ProblemComponent', () => {
  let component: ProblemComponent;
  let fixture: ComponentFixture<ProblemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
