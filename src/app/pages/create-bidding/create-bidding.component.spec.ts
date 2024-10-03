import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBiddingComponent } from './create-bidding.component';

describe('CreateBiddingComponent', () => {
  let component: CreateBiddingComponent;
  let fixture: ComponentFixture<CreateBiddingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBiddingComponent]
    });
    fixture = TestBed.createComponent(CreateBiddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
