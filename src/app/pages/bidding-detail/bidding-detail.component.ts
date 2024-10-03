import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Bidding, GetAuctioneersByBiddingDto } from 'src/app/core/models/bidding';
import { AuthService } from 'src/app/core/services/auth.service';
import { BiddingService } from 'src/app/core/services/bidding.service';

@Component({
  selector: 'app-bidding-detail',
  templateUrl: './bidding-detail.component.html',
  styleUrls: ['./bidding-detail.component.css'],
  providers: [MessageService]
})
export class BiddingDetailComponent implements OnInit {

  @ViewChild('uploadedFiles') uploadedFiles!: FileUpload;
  addAuctioneerForm!: FormGroup;
  breadcrumbItems: MenuItem[] | undefined;
  bidding!: Bidding;
  biddingId: number = 0;
  bidList!: GetAuctioneersByBiddingDto[];
  maskLoading: boolean = false;
  biddingDialog: boolean = false;
  submitted: boolean = false;
  minDate!: Date;
  percentValue: number = 0;
  isValidToAddAuctioneer: boolean = true;
  isBiddingOwner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private biddingService: BiddingService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let storeId = this.authService.getManagedStoreIdFromToken();
    let userId = this.authService.getUserIdFromToken();
    this.maskLoading = true;
    this.breadcrumbItems = [{ label: 'Chi tiết yêu cầu' }];
    this.route.paramMap.subscribe(params => {
      const idFromRoute = params.get('id')!;
      this.biddingId = parseInt(idFromRoute, 10);
      this.biddingService.getBiddingById(this.biddingId).subscribe(res => {
        this.bidding = res;
        if (userId && userId == this.bidding.customerId) {
          this.isBiddingOwner = true;
        }

      })
    })
    this.initializeAddAuctioneerForm();
    this.minDate = new Date();
    this.biddingService.getAutioneersByBiddingId(this.biddingId).subscribe(res => {
      this.initializeBidData(res);
      this.maskLoading = false;
    })
    if (storeId) {
      this.biddingService.isValidToAddAuctioneer(storeId, this.biddingId).subscribe(res => {
        this.isValidToAddAuctioneer = res;
      })
    }
  }

  initializeAddAuctioneerForm() {
    this.addAuctioneerForm! = this.fb.group({
      completedDate: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0), Validators.max(50000000), this.numericValidator]],
    });
  }

  onAddAuctioneer() {
    this.maskLoading = true;
    const storeId = this.authService.getManagedStoreIdFromToken();
    if (this.addAuctioneerForm.valid && storeId) {
      var formData = new FormData();
      formData.append('completedTime', this.addAuctioneerForm.get('completedDate')!.value.toISOString());
      formData.append('price', this.addAuctioneerForm.get('price')!.value);
      formData.append('percentOfComplete', this.percentValue.toString());
      formData.append('storeId', storeId);
      formData.append('biddingId', this.biddingId.toString());
      this.uploadedFiles._files.forEach((element: string | Blob) => {
        formData.append('files', element);
      });
      this.biddingService.addAuctioneer(formData)
        .subscribe(res => {
          if (res) {
            window.location.reload();
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Bạn đã ra giá thành công!' });
          }
        }
        );

    } else {
      this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Tạo yêu cầu thất bại!' });
    }
  }

  onClickAuctioneer() {
    const storeId = this.authService.getManagedStoreIdFromToken();
    const userId = this.authService.getUserIdFromToken();

    if (!this.isValidToAddAuctioneer) {
      this.messageService.add({ severity: 'warn', summary: 'Ra giá thất bại', detail: 'Mỗi cửa hàng chỉ được ra giá 1 lần cho mỗi cuộc đấu giá!' });
      return;
    }

    if (userId != undefined) {
      if (storeId != undefined) {
        this.openBiddingDialog();
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Ra giá thất bại', detail: 'Bạn cần phải tạo cửa hàng để ra giá, hãy tạo cửa hàng và thử lại nhé!!' });
      }
    } else {
      this.router.navigate(['sign-in'], { queryParams: { redirectUrl: `/bidding-detail/${this.biddingId}` } });
    }
  }

  openBiddingDialog() {
    this.biddingDialog = true;
  }

  hideBiddingDialog() {
    this.biddingDialog = false;
  }

  numericValidator(control: AbstractControl): ValidationErrors | null {
    const price = control.value;
    if (!/^\d+$/.test(price)) {
      return { invalidPrice: true };
    }
    return null;
  }

  initializeBidData(data: GetAuctioneersByBiddingDto[]) {
    this.bidList = data;
  }
}
