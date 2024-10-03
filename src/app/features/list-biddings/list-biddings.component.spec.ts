import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBiddingsComponent } from './list-biddings.component';

describe('ListBiddingsComponent', () => {
  let component: ListBiddingsComponent;
  let fixture: ComponentFixture<ListBiddingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBiddingsComponent]
    });
    fixture = TestBed.createComponent(ListBiddingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
