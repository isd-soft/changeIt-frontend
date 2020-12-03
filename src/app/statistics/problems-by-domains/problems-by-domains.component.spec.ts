import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProblemsByDomainsComponent } from './problems-by-domains.component';

describe('ProblemsByDomainsComponent', () => {
  let component: ProblemsByDomainsComponent;
  let fixture: ComponentFixture<ProblemsByDomainsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemsByDomainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemsByDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
