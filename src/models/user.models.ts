import { user } from "@/interfaces/user.interface";

export const userDefault: user = {
  id: 1,
  first_name: "",
  last_name: "",
  patronymic: "",
  phone: "",
  gender: "male",
  email: "",
  email_verified: true,
  role: {
    role_id: 3,
    role_name: "user",
  },
};
