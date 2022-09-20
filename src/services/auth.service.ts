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
      TokenService.saveToken(token);
      // TokenService.saveRefreshToken(response.data.refresh_token);
      ApiService.setHeader();

      ApiService.mount401Interceptor();

      return response.data;
    } catch (error) {
      this.catchError(error, AuthenticationError);
    }
  },

  getCode: async function (codeData: any) {
    const requestData: AxiosRequestConfig = {
      method: "post",
      url: `/auth/verifyCode?${codeData.login ? "login" : ""}`,
      data: qs.stringify({
        grant_type: "password",
        phone: codeData.phone,
        login: codeData.login,
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

      TokenService.saveToken(response.data.access_token);
      TokenService.saveRefreshToken(response.data.refresh_token);
      ApiService.setHeader();

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
      TokenService.saveToken(token);
      // TokenService.saveRefreshToken(response.data.refresh_token);
      ApiService.setHeader();

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
