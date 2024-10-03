import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticDialogComponent } from './statistic-dialog.component';

describe('StatisticDialogComponent', () => {
  let component: StatisticDialogComponent;
  let fixture: ComponentFixture<StatisticDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticDialogComponent]
    });
    fixture = TestBed.createComponent(StatisticDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
