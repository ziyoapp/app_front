import { updateUser, user, userQuestion } from "@/interfaces/user.interface";

export const userDefault: user = {
  id: 1,
  first_name: "",
  last_name: "",
  patronymic: "",
  phone: "",
  gender: "male",
  email: "",
  email_verified: true,
  avatar: "",
  role: {
    role_id: 3,
    role_name: "user",
  },
};

export const updateUserForm: updateUser = {
  first_name: "",
  last_name: "",
  birth_date: "",
  gender: "male",
  additional_info: "",
  nickname: "",
  email: "",
  avatar: "",
};

export const userQuestionForm: userQuestion = {
  email: "",
  text: "",
};
