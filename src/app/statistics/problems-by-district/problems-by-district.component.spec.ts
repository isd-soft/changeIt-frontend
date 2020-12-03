import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemsByDistrictComponent } from './problems-by-district.component';

describe('ProblemsByDistrictComponent', () => {
  let component: ProblemsByDistrictComponent;
  let fixture: ComponentFixture<ProblemsByDistrictComponent>;

  beforeEach(async(() => {
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
