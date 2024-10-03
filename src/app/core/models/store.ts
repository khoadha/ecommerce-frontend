export interface Store {
  id: number;
  name: string;
  description: string;
  location: string;
  imgPath: string;
  thumbnailImgPath: string;
  isOpen: boolean;
  isVerified: boolean;
  isBanned: boolean;
  storeEmail: string;
}
