import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedbackDialogComponent } from './add-feedback-dialog.component';

describe('AddFeedbackDialogComponent', () => {
  let component: AddFeedbackDialogComponent;
  let fixture: ComponentFixture<AddFeedbackDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFeedbackDialogComponent]
    });
    fixture = TestBed.createComponent(AddFeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
