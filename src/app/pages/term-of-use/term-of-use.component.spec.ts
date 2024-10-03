import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermOfUseComponent } from './term-of-use.component';

describe('TermOfUseComponent', () => {
  let component: TermOfUseComponent;
  let fixture: ComponentFixture<TermOfUseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermOfUseComponent]
    });
    fixture = TestBed.createComponent(TermOfUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
