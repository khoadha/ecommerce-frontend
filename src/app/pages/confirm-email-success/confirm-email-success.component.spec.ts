import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmailSuccessComponent } from './confirm-email-success.component';

describe('ConfirmEmailSuccessComponent', () => {
  let component: ConfirmEmailSuccessComponent;
  let fixture: ComponentFixture<ConfirmEmailSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmEmailSuccessComponent]
    });
    fixture = TestBed.createComponent(ConfirmEmailSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
