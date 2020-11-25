import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurProblemsResultComponent } from './our-problems-result.component';

describe('OurProblemsResultComponent', () => {
  let component: OurProblemsResultComponent;
  let fixture: ComponentFixture<OurProblemsResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurProblemsResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurProblemsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
