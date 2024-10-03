import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingManagerComponent } from './billing-manager.component';

describe('BillingManagerComponent', () => {
  let component: BillingManagerComponent;
  let fixture: ComponentFixture<BillingManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingManagerComponent]
    });
    fixture = TestBed.createComponent(BillingManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
