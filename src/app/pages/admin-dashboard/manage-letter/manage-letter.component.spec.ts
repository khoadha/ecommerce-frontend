import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLetterComponent } from './manage-letter.component';

describe('ManageLetterComponent', () => {
  let component: ManageLetterComponent;
  let fixture: ComponentFixture<ManageLetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageLetterComponent]
    });
    fixture = TestBed.createComponent(ManageLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
