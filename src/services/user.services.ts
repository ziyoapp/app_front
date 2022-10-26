import { AxiosRequestConfig } from "axios";
import ApiService from "@/services/api.service";
import { EventsError } from "@/services/events.services";
import { catchError } from "@/shared/utils";

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
      this.catchError(error, EventsError);
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
      this.catchError(error, EventsError);
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
      this.catchError(error, EventsError);
    }
  },
  catchError: catchError,
};

export { UserServices, UserError };
