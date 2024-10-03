export interface Voucher {
    id: number;
    name: string;
    description: string;
    createdBy: string;
    createdAt: any;
    isDisplay: boolean;
    percentage: number;
    approvedValue: number;
    maxValue: number;
    availableCount: number;
}

export interface CheckAvailableVoucherResponseDto {
    discountValue: number;
    isAvailable: boolean;
}



