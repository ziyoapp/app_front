export interface user {
  id: number;
  first_name: string;
  last_name: string;
  patronymic: string;
  phone: string;
  gender: string;
  email: string;
  email_verified: boolean;
  role: {
    role_id: number;
    role_name: string;
  };
}

export interface userState {
  user: user;
  qrCode: string;
  userError: string;
  bonus: number;
}
