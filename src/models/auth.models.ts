import { loginInterface, registerInterface } from "@/interfaces/auth.interface";

export const loginForm: loginInterface = {
  email: "",
  password: "",
};

export const registerForm: registerInterface = {
  first_name: "",
  last_name: "",
  birth_date: "",
  gender: "",
  phone: "",
  email: "",
  password: "",
  password_confirmation: "",
  privacy_accept: false,
};
