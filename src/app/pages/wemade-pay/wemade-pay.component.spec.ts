import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WemadePayComponent } from './wemade-pay.component';

describe('WemadePayComponent', () => {
  let component: WemadePayComponent;
  let fixture: ComponentFixture<WemadePayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WemadePayComponent]
    });
    fixture = TestBed.createComponent(WemadePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
