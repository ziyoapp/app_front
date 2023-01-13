import { loginInterface, registerInterface } from "@/interfaces/auth.interface";

export const loginForm: loginInterface = {
  phone: "",
  password: "",
};

export const registerForm: registerInterface = {
  phone: "",
  password: "",
  password_confirmation: "",
  code: NaN,
};
