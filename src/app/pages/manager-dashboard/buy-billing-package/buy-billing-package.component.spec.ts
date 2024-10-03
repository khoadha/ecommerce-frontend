import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyBillingPackageComponent } from './buy-billing-package.component';

describe('BuyBillingPackageComponent', () => {
  let component: BuyBillingPackageComponent;
  let fixture: ComponentFixture<BuyBillingPackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyBillingPackageComponent]
    });
    fixture = TestBed.createComponent(BuyBillingPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
