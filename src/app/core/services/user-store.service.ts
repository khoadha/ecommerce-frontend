import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private userId$ = new BehaviorSubject<string>("");
  private username$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private managedStoreId$ = new BehaviorSubject<string>("");
  private email$ = new BehaviorSubject<string>("");
  private cartId$ = new BehaviorSubject<string>("");
  private phoneNumber$ = new BehaviorSubject<string>("");
  private imgPath$ = new BehaviorSubject<string>("");

  constructor() { }

  public getUserIdFromStore() {
    return this.userId$.asObservable();
  }

  public getImgPathFromStore(){
    return this.imgPath$.asObservable();
  }

  public getManagedStoreIdFromStore() {
    return this.managedStoreId$.asObservable();
  }

  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public getUsernameFromStore() {
    return this.username$.asObservable();
  }

  public getEmailFromStore() {
    return this.email$.asObservable();
  }

  public getPhoneNumberFromStore() {
    return this.phoneNumber$.asObservable();
  }

  public getCartIdFromStore() {
    return this.cartId$.asObservable();
  }

  public setUserIdForStore(userId: string) {
    this.userId$.next(userId);
  }

  public setImgPathForStore(imgPath: string) {
    this.imgPath$.next(imgPath);
  }

  public setRoleForStore(role: string) {
    this.role$.next(role);
  }

  public setUsernameForStore(username: string) {
    this.username$.next(username);
  }

  public setPhoneNumberForStore(phoneNumber: string){
    this.phoneNumber$.next(phoneNumber);
  }

  public setManagedStoreIdForStore(managedStoreId: string) {
    this.managedStoreId$.next(managedStoreId);
  }

  public setCartIdForStore(cartId: string) {
    this.cartId$.next(cartId);
  }

  public setEmailForStore(email: string) {
    this.email$.next(email);
  }


  public clearAllDatasFromStore() {
    this.userId$.next("");
    this.username$.next("");
    this.role$.next("");
    this.email$.next("");
    this.cartId$.next("");
    this.managedStoreId$.next("");
    this.imgPath$.next("");
  }
}
