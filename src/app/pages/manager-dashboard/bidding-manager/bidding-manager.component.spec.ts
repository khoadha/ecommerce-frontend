import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingManagerComponent } from './bidding-manager.component';

describe('BiddingManagerComponent', () => {
  let component: BiddingManagerComponent;
  let fixture: ComponentFixture<BiddingManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BiddingManagerComponent]
    });
    fixture = TestBed.createComponent(BiddingManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
