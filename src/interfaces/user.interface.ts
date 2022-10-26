import { pagination } from "@/interfaces/common.interface";

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
