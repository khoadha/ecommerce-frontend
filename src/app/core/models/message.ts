export interface Message {
  from: string;
  to?: string;
  toName?: string;
  content: string;
  dateTime?: Date;
}

export interface UserList {
  email: string;
  username: string;
  imgPath: string;
  lastMessage?: string;
  currentUser: string;
}
