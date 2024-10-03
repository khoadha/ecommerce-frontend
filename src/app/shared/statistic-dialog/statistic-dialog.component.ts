import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Statistic } from 'src/app/core/models/statistic';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-statistic-dialog',
  templateUrl: './statistic-dialog.component.html',
  styleUrls: ['./statistic-dialog.component.css']
})
export class StatisticDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Statistic, private storeService: StoreService) { }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  ngOnInit() {
    this.range.valueChanges.subscribe(val => {
      if (val.start && val.end) {
        const fromDate = val.start;
        const toDate = val.end;
        this.storeService.getStatisticOfStore(this.data.storeId!, fromDate, toDate).subscribe(res => {
          this.data = res;
        });
      }
    });
  }
}
