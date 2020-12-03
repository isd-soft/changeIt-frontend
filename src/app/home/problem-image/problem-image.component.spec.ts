import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProblemImageComponent } from './problem-image.component';

describe('ProblemImageComponent', () => {
  let component: ProblemImageComponent;
  let fixture: ComponentFixture<ProblemImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
