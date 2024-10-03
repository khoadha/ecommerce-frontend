import { Component, OnInit,  ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { UserStoreService } from 'src/app/core/services/user-store.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/core/services/payment.service';
import { UserService } from 'src/app/core/services/user.service';
import { Profile } from 'src/app/core/models/profile';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{

  constructor(private userService: UserService, private paymentService: PaymentService, private router: Router,private auth: AuthService, private userStore: UserStoreService, private cartService: CartService) { }

  readonly MAX_SUGGESTIONS = 10;

  profile!: Profile;
  public username!: string;
  public userId!: string;
  public role!: string;
  listSuggestions: string[] = [];
  public managedStoreId!: string;
  public orderedState!: string;
  public cartSize: number = 0;
  private cartSizeSubscription!: Subscription;
  imgPath!: string;
  searchQuery: string = '';
  point: number = 0;
  
  ngOnInit(): void {
    this.loadSuggestions();
    this.getSessionUserInformation();
  }

  private getSessionUserInformation(){
    this.userStore.getUsernameFromStore()
    .subscribe(val => {
      let usernameFromToken = this.auth.getUsernameFromToken();
      this.username = val || usernameFromToken
    })
  this.userStore.getRoleFromStore()
    .subscribe(val => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  this.userStore.getManagedStoreIdFromStore()
    .subscribe(val => {
      const managedStoreId = this.auth.getManagedStoreIdFromToken();
      this.managedStoreId = val || managedStoreId;
    })
  this.userStore.getImgPathFromStore()
    .subscribe(val => {
      const imgPath = this.auth.getImgPathFromToken();
      this.imgPath = val || imgPath;
    })
    if(this.role=="User"){
      const cartId = this.auth.getCartIdFromToken();
      this.cartSizeSubscription = this.cartService.getCartSize(cartId).subscribe(size => {
        this.cartSize = size;
      });
      this.cartService.getCartUpdatedObservable().subscribe(() => {
        this.cartService.getCartSize(cartId).subscribe(size => {
          this.cartSize = size;
        });
      });
    }
    this.userStore.getUserIdFromStore()
      .subscribe(val => {
        const usId = this.auth.getUserIdFromToken();
        this.userId = val || usId;
        
      })
    if(this.userId){
      this.userService.getProfileByUserId(this.userId).subscribe(res => {
          this.profile = res;
        });
    }
  }

  ngOnDestroy(): void {
    if(this.cartSizeSubscription!=undefined){
      this.cartSizeSubscription.unsubscribe();
    }
  }

  onSearch(){
    this.saveQueryToLocalStorage(this.searchQuery);
    this.router.navigate(['search'], { queryParams: { q: this.searchQuery } });
  }

  saveQueryToLocalStorage(query: string): void {
    let suggestions = localStorage.getItem('suggestions');
    if (suggestions) {
      this.listSuggestions = JSON.parse(suggestions);
    }

    if (!this.listSuggestions.includes(query)) {
      if (this.listSuggestions.length >= this.MAX_SUGGESTIONS) {
        this.listSuggestions.shift()
      }
      this.listSuggestions.push(query);
      localStorage.setItem('suggestions', JSON.stringify(this.listSuggestions));
    }
  }

  loadSuggestions(): void {
    let suggestions = localStorage.getItem('suggestions');
    if (suggestions) {
      this.listSuggestions = JSON.parse(suggestions);
    }
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

  logOut() {
    this.auth.logOut();
  }
}
