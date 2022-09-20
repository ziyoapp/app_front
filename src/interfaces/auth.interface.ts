export interface loginInterface {
  email: string;
  password: string;
}

export interface registerInterface {
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  privacy_accept: boolean;
}
