import { Component, Input } from '@angular/core';
import { Bidding } from 'src/app/core/models/bidding';

@Component({
  selector: 'app-list-biddings',
  templateUrl: './list-biddings.component.html',
  styleUrls: ['./list-biddings.component.css']
})
export class ListBiddingsComponent {

  @Input() listBiddings: Bidding[] = [];
}
