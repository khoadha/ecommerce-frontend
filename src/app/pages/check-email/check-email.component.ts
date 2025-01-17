import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.css']
})
export class CheckEmailComponent implements OnInit {

  email: string | null ='';

  ngOnInit(): void {
    this.email = localStorage.getItem('tempmail');
    localStorage.removeItem('tempmail');
  }
}
