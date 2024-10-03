import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryManagerComponent } from './delivery-manager.component';

describe('DeliveryManagerComponent', () => {
  let component: DeliveryManagerComponent;
  let fixture: ComponentFixture<DeliveryManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryManagerComponent]
    });
    fixture = TestBed.createComponent(DeliveryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
