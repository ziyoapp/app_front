import ApiService from "./api.service";
import { AxiosRequestConfig } from "axios";
import { catchError } from "@/shared/utils";
import { newsGetRequest } from "@/interfaces/news.interface";

class NewsError extends Error {
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

const NewsService = {
  getLatest: async function (data: newsGetRequest) {
    const requestData: AxiosRequestConfig = {
      method: "get",
      url: "/news/latest",
      params: data,
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, NewsError);
    }
  },
  getAll: async function (data: newsGetRequest) {
    const requestData: AxiosRequestConfig = {
      method: "get",
      url: "/news",
      params: data,
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, NewsError);
    }
  },
  getOne: async function (newsId: number) {
    const requestData: AxiosRequestConfig = {
      method: "get",
      url: `/news/${newsId}`,
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, NewsError);
    }
  },
  catchError: catchError,
};

export { NewsService, NewsError };
