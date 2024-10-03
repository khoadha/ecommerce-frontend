export interface GetFeedbackDto {
    userImage?: string;
    username?: string;
    createdDate?: any;
    description?: string;
    rating: number;
    listImages: string[];
}

export interface GetFeedbackPaginationDto {
    total: number;
    data: GetFeedbackDto[];
}

export interface AddFeedbackDto {
   userId: string;
   description?: string;
   rating?: number;
   files?: any;
}