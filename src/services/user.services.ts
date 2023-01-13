import { AxiosRequestConfig } from "axios";
import ApiService from "@/services/api.service";
import { EventsError } from "@/services/events.services";
import { catchError } from "@/shared/utils";
import {
  bonusHistoryGetRequest,
  changePassword,
  resetPassword,
  updateUser,
  userQuestion,
} from "@/interfaces/user.interface";
import qs from "qs";
import { AuthenticationError } from "@/services/auth.service";

class UserError extends Error {
  errorCode: any;
  errorMessage: any;
  constructor(errorCode: any, message: string | undefined) {
    super(message);
    this.name = this.constructor.name;
    if (message != null) {
      this.message = message;
    }
    this.errorCode = errorCode;
  }
}

const UserServices = {
  getUser: async function () {
    const requestData: AxiosRequestConfig = {
      method: "get",
      url: "/user",
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, UserError);
    }
  },
  getQrCode: async function () {
    const requestData: AxiosRequestConfig = {
      method: "get",
      url: "/user/qr-code",
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, UserError);
    }
  },
  getBonus: async function () {
    const requestData: AxiosRequestConfig = {
      method: "get",
      url: "/user/bonus",
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, UserError);
    }
  },
  getBonusHistory: async function (data: bonusHistoryGetRequest) {
    const requestData: AxiosRequestConfig = {
      method: "get",
      url: "/user/bonus-history",
      params: data,
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, UserError);
    }
  },
  updateUser: async function (data: FormData) {
    const requestData: AxiosRequestConfig = {
      method: "post",
      url: "/user/update",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, UserError);
    }
  },
  updatePassword: async function (data: changePassword) {
    const requestData: AxiosRequestConfig = {
      method: "post",
      url: "/user/change-password",
      data,
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, UserError);
    }
  },
  resetPassword: async function (data: resetPassword) {
    const requestData: AxiosRequestConfig = {
      method: "post",
      url: "/user/password-reset",
      data,
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, UserError);
    }
  },
  getResetCode: async function (phone: string) {
    const requestData: AxiosRequestConfig = {
      method: "post",
      url: "/user/reset-verify-code",
      data: qs.stringify({
        phone,
      }),
    };

    try {
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      return this.catchError(error, AuthenticationError);
    }
  },
  sendQuestion: async function (data: userQuestion) {
    const requestData: AxiosRequestConfig = {
      method: "post",
      url: "/user/question",
      data,
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, UserError);
    }
  },
  catchError: catchError,
};

export { UserServices, UserError };
