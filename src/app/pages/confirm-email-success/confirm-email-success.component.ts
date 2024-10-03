import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-email-success',
  templateUrl: './confirm-email-success.component.html',
  styleUrls: ['./confirm-email-success.component.css']
})
export class ConfirmEmailSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    var data = localStorage.getItem('orderss');
    if (data === undefined) {
      this.router.navigate([''])
    }
    localStorage.removeItem('orderss');
  }
}
