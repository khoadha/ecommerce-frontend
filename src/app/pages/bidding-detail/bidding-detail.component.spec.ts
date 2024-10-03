import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingDetailComponent } from './bidding-detail.component';

describe('BiddingDetailComponent', () => {
  let component: BiddingDetailComponent;
  let fixture: ComponentFixture<BiddingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BiddingDetailComponent]
    });
    fixture = TestBed.createComponent(BiddingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
