import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  amount!: string;
  bankCode!: string;
  transactionNo!: string;
  cardType!: string;
  orderInfo!: string;
  time!: string;
  txnRef!: string;
  payDateTime!: Date;

  constructor(private route: ActivatedRoute, private router: Router, private paymentService: PaymentService, private authService: AuthService) { }

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    this.amount = sessionStorage.getItem('amount')!;
    this.bankCode = sessionStorage.getItem('bankCode')!;
    this.transactionNo = sessionStorage.getItem('transactionNo')!;
    this.cardType = sessionStorage.getItem('cardType')!;
    this.orderInfo = sessionStorage.getItem('orderInfo')!;
    this.time = sessionStorage.getItem('time')!;
    this.txnRef = sessionStorage.getItem('txnRef')!;
    if(this.txnRef==undefined){
      this.router.navigate([''])
    }
    this.payDateTime = this.parseDateString(this.time);
    this.paymentService.handlePaymentSuccess(this.txnRef, userId).subscribe(res => {},(error) => {
    });
    sessionStorage.clear();
  }

  private parseDateString(dateString: string): Date {
    const year = +dateString.substring(0, 4);
    const month = +dateString.substring(4, 6) - 1;
    const day = +dateString.substring(6, 8);
    const hours = +dateString.substring(8, 10);
    const minutes = +dateString.substring(10, 12);
    const seconds = +dateString.substring(12, 14);
    return new Date(year, month, day, hours, minutes, seconds);
  }
}
