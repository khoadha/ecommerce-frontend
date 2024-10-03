import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBannerComponent } from './manage-banner.component';

describe('ManageBannerComponent', () => {
  let component: ManageBannerComponent;
  let fixture: ComponentFixture<ManageBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageBannerComponent]
    });
    fixture = TestBed.createComponent(ManageBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
