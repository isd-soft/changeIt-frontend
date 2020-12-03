import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProblemsByDistrictComponent } from './problems-by-district.component';

describe('ProblemsByDistrictComponent', () => {
  let component: ProblemsByDistrictComponent;
  let fixture: ComponentFixture<ProblemsByDistrictComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemsByDistrictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemsByDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
