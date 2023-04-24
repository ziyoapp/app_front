import { loginInterface, registerInterface } from "@/interfaces/auth.interface";

export const loginForm: loginInterface = {
  phone: "998",
  password: "",
};

export const registerForm: registerInterface = {
  phone: "998",
  password: "",
  password_confirmation: "",
  code: NaN,
};
