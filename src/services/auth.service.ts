import ApiService from "./api.service";
import { TokenService } from "./token.service";
import { AxiosRequestConfig } from "axios";
import qs from "qs";
import { catchError } from "@/shared/utils";
import { registerInterface } from "@/interfaces/auth.interface";

class AuthenticationError extends Error {
  errorCode: any;
  constructor(errorCode: any, message: string | undefined) {
    super(message);
    this.name = this.constructor.name;
    if (message != null) {
      this.message = message;
    }
    this.errorCode = errorCode;
  }
}

const AuthService = {
  signIn: async function (signInData: any) {
    const requestData: AxiosRequestConfig = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(
            process.env.VUE_APP_CLIENT_ID +
              ":" +
              process.env.VUE_APP_CLIENT_SECRET
          ),
      },
      url: "/user/login",
      data: signInData,
    };

    try {
      const response = await ApiService.customRequest(requestData);
      const token = response.data.token;
      await TokenService.saveToken(token);
      // TokenService.saveRefreshToken(response.data.refresh_token);
      ApiService.setHeader(token);

      ApiService.mount401Interceptor();

      return response.data;
    } catch (error) {
      this.catchError(error, AuthenticationError);
    }
  },

  getCode: async function (phone: string) {
    const requestData: AxiosRequestConfig = {
      method: "post",
      url: "/user/register-verify-code",
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

  refreshToken: async function () {
    const refreshToken = TokenService.getRefreshToken();

    const requestData: AxiosRequestConfig = {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            process.env.VUE_APP_CLIENT_ID +
              ":" +
              process.env.VUE_APP_CLIENT_SECRET
          ),
      },
      url: "/oauth/token",
      data: qs.stringify({
        grant_type: "refresh_token",
        refreshToken: refreshToken,
      }),
    };

    try {
      const response = await ApiService.customRequest(requestData);

      await TokenService.saveToken(response.data.access_token);
      TokenService.saveRefreshToken(response.data.refresh_token);
      ApiService.setHeader(response.data.access_token);

      return response.data.access_token;
    } catch (error: any) {
      throw new AuthenticationError(
        error.response.status,
        error.response.data.error_description
      );
    }
  },

  signOut() {
    TokenService.removeToken();
    // TokenService.removeRefreshToken();
    ApiService.removeHeader();
    ApiService.unmount401Interceptor();
  },

  signup: async function (data: registerInterface): Promise<any> {
    const signupData: AxiosRequestConfig = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      url: "/user/register",
      data,
    };

    try {
      const response = await ApiService.customRequest(signupData);
      const token = response.data.token;
      await TokenService.saveToken(token);
      // TokenService.saveRefreshToken(response.data.refresh_token);
      ApiService.setHeader(token);

      ApiService.mount401Interceptor();

      return response.data;
    } catch (error) {
      this.catchError(error, AuthenticationError);
    }
    // try {
    //   return await ApiService.customRequest(signupData);
    // } catch (error) {
    //   this.catchError(error, AuthenticationError);
    // }
  },

  catchError: catchError,
};

export { AuthService, AuthenticationError };
