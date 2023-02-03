import { AxiosRequestConfig } from "axios";
import ApiService from "@/services/api.service";
import { productsRequest } from "@/interfaces/shop.interface";
import { catchError } from "@/shared/utils";

class StoryError extends Error {
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

const StoryService = {
  getCategories: async function () {
    const requestData: AxiosRequestConfig = {
      method: "get",
      url: "/stories",
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, StoryError);
    }
  },
  catchError: catchError,
};

export { StoryService, StoryError };
