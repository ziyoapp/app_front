import { AxiosRequestConfig } from "axios";
import ApiService from "@/services/api.service";
import { productsRequest } from "@/interfaces/shop.interface";
import { catchError } from "@/shared/utils";

class ShopError extends Error {
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

const ShopService = {
  getCategories: async function () {
    const requestData: AxiosRequestConfig = {
      method: "get",
      url: "/shop/categories",
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, ShopError);
    }
  },
  getProducts: async function (data: productsRequest) {
    const requestData: AxiosRequestConfig = {
      method: "get",
      url: `/shop/categories/${data.category_id}/products`,
      params: data,
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, ShopError);
    }
  },
  getOneProduct: async function (id: number) {
    const requestData: AxiosRequestConfig = {
      method: "get",
      url: `/shop/products/${id}`,
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, ShopError);
    }
  },
  buyOneProduct: async function (id: number) {
    const requestData: AxiosRequestConfig = {
      method: "post",
      url: `/shop/products/${id}/buy`,
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, ShopError);
    }
  },
  catchError: catchError,
};

export { ShopService, ShopError };
