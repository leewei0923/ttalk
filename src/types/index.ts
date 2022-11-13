export interface userInfoType {
  openid: string;
  account: string;
  nickname: string;
  avatar: string;
  social: string;
  motto: string;
  bird_date: string;
  add_time: string;
  ip: string;
}



// src\pages\addressBook\addressBook.tsx
export interface pageStateType {
  type: '' | 'friend' | 'account';
  content: string
}