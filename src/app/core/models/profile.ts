export interface Profile {
  id: string
  userName: string
  email: string
  phoneNumber: string
  imgPath: string
  wemadePoint: number
  managedStoreId: string
}
  
export interface UpdateUsernameDto {
  username?: string;
}

export interface UpdatePhoneDto{
  phonenumber?: string;
}

export interface UpdatePasswordDto{
  currentpassword?: string;
  newpassword?: string;
}

export interface PasswordCriteria {
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasDigit: boolean;
  hasSpecialChar: boolean;
  isValidLength: boolean;
}