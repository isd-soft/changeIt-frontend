import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterConfirmEmailComponent } from './after-confirm-email.component';

describe('AfterConfirmEmailComponent', () => {
  let component: AfterConfirmEmailComponent;
  let fixture: ComponentFixture<AfterConfirmEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterConfirmEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
