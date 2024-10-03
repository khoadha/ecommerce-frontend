import { Component, Input } from '@angular/core';
import { Store } from 'src/app/core/models/store';
@Component({
  selector: 'app-list-stores',
  templateUrl: './list-stores.component.html',
  styleUrls: ['./list-stores.component.css']
})
export class ListStoresComponent{
  @Input() listStores: Store[] = [];
  @Input() title!: string;

}

