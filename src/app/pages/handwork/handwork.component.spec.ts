import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandworkComponent } from './handwork.component';

describe('HandworkComponent', () => {
  let component: HandworkComponent;
  let fixture: ComponentFixture<HandworkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HandworkComponent]
    });
    fixture = TestBed.createComponent(HandworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
