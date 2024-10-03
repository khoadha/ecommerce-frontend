import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-redirect',
  templateUrl: './payment-redirect.component.html',
  styleUrls: ['./payment-redirect.component.css']
})
export class PaymentRedirectComponent implements OnInit {

  vnp_Amount!: string;
  vnp_BankCode!: string;
  vnp_BankTranNo!: string;
  vnp_CardType!: string;
  vnp_OrderInfo!: string;
  vnp_PayDate!: string;
  vnp_ResponseCode!: string;
  vnp_TransactionStatus!: string;
  vnp_TxnRef!: string;
  resultAmount!: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.vnp_Amount = params['vnp_Amount'];
      this.vnp_BankCode = params['vnp_BankCode'];
      this.vnp_BankTranNo = params['vnp_BankTranNo'];
      this.vnp_CardType = params['vnp_CardType'];
      this.vnp_OrderInfo = params['vnp_OrderInfo'];
      this.vnp_PayDate = params['vnp_PayDate'];
      this.vnp_ResponseCode = params['vnp_ResponseCode'];
      this.vnp_TransactionStatus = params['vnp_TransactionStatus'];
      this.vnp_TxnRef = params['vnp_TxnRef'];

      if (this.vnp_ResponseCode === '00' && this.vnp_TransactionStatus === '00') {
        this.resultAmount = parseFloat(this.vnp_Amount) / 100;
        sessionStorage.setItem('amount', this.resultAmount.toString());
        sessionStorage.setItem('time', this.vnp_PayDate);
        sessionStorage.setItem('bankCode', this.vnp_BankCode)
        sessionStorage.setItem('orderInfo', this.vnp_OrderInfo)
        sessionStorage.setItem('transactionNo', this.vnp_BankTranNo)
        sessionStorage.setItem('cardType', this.vnp_CardType)
        sessionStorage.setItem('txnRef', this.vnp_TxnRef)
        this.router.navigate(['/payment-success']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
