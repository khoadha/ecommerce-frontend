import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-term-of-use',
  templateUrl: './term-of-use.component.html',
  styleUrls: ['./term-of-use.component.css']
})
export class TermOfUseComponent implements OnInit {
   ngOnInit(): void {
    window.scroll(0, 0);
   }
}
