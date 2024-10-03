import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      const userId = params['userId']
      const token = params['token']
      if(userId!=undefined&&token!=undefined) {
        this.authService.confirmEmail(userId, token).subscribe(res => {
        })
        this.router.navigate(['confirm-email']);
      }
    });
  }
}
