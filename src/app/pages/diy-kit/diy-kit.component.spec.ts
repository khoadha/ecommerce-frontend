import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiyKitComponent } from './diy-kit.component';

describe('DiyKitComponent', () => {
  let component: DiyKitComponent;
  let fixture: ComponentFixture<DiyKitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiyKitComponent]
    });
    fixture = TestBed.createComponent(DiyKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
