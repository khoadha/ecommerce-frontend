import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  @Input()
  headerContent!: string;
  @Input()
  bodyContent!: string;
  @Input()
  submitButtonContent!: string;

}
