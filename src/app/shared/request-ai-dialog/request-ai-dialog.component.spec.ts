import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAiDialogComponent } from './request-ai-dialog.component';

describe('RequestAiDialogComponent', () => {
  let component: RequestAiDialogComponent;
  let fixture: ComponentFixture<RequestAiDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestAiDialogComponent]
    });
    fixture = TestBed.createComponent(RequestAiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
