import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserStoreService } from 'src/app/core/services/user-store.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  constructor(private auth:AuthService, private userStore: UserStoreService) {}

  public username: string = ""
  public role!: string[];

  ngOnInit(): void {

    this.userStore.getUsernameFromStore()
    .subscribe(val=>{
      let usernameFromToken = this.auth.getUsernameFromToken();
      this.username= val || usernameFromToken
    })

    this.userStore.getRoleFromStore()
    .subscribe(val=> {
      const roleFromToken= this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }

  onClickFanpage(platform: string) {
    if (platform == 'fb') {
      const url = 'https://www.facebook.com/wemadevietnam';
      window.open(url, '_blank');
    }
    if (platform == 'ig') {
      const url = 'https://www.instagram.com/wemade.ig';
      window.open(url, '_blank');
    }
  }
  
  onClick(event :Event){
    event.preventDefault();
}
  logOut(){
    this.auth.logOut();
  }
}
