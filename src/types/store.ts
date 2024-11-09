export interface UserBase {
  socialId: string;
  username: string;
  email: string;
}

export interface UserCreate extends UserBase {
  id: number;
  createdAt: string;
}
