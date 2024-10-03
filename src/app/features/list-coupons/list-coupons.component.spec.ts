import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCouponsComponent } from './list-coupons.component';

describe('ListCouponsComponent', () => {
  let component: ListCouponsComponent;
  let fixture: ComponentFixture<ListCouponsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCouponsComponent]
    });
    fixture = TestBed.createComponent(ListCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
