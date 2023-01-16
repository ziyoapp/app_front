import { pagination } from "@/interfaces/common.interface";

export interface user {
  id: number;
  first_name: string;
  last_name: string;
  patronymic: string;
  phone: string;
  gender: string;
  email: string;
  email_verified?: boolean;
  nickname?: string;
  additional_info?: string;
  role: {
    role_id: number;
    role_name: string;
  };
  avatar: string;
}

export interface userState {
  user: user;
  qrCode: string;
  userError: string;
  bonus: number;
  transactions: Array<bonusHistory>;
  bonusPagination: pagination;
}

export interface bonusHistory {
  id: number;
  operation_type: string;
  name: string;
  ball: string;
  currency: string;
  date: string;
}

export interface bonusHistoryGetRequest {
  page?: number;
  per_page?: number;
  isInfiniteScroll?: boolean;
}

export interface updateUser {
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  nickname: string;
  additional_info: string;
  email: string;
  avatar?: string;
}

export interface userQuestion {
  email: string;
  text: string;
}

export interface changePassword {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface resetPassword {
  phone: string;
  password: string;
  password_confirmation: string;
  code: number;
}
