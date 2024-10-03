import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRedirectComponent } from './payment-redirect.component';

describe('PaymentRedirectComponent', () => {
  let component: PaymentRedirectComponent;
  let fixture: ComponentFixture<PaymentRedirectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentRedirectComponent]
    });
    fixture = TestBed.createComponent(PaymentRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
