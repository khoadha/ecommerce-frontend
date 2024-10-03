import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpStoreComponent } from './sign-up-store.component';

describe('SignUpStoreComponent', () => {
  let component: SignUpStoreComponent;
  let fixture: ComponentFixture<SignUpStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpStoreComponent]
    });
    fixture = TestBed.createComponent(SignUpStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
