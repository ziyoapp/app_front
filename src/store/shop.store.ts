import {
  shopState,
  productsRequest,
  product as oneProduct,
  category,
} from "@/interfaces/shop.interface";

import { ShopService, ShopError } from "@/services/shop.services";
import { defaultCategory, defaultProduct } from "@/models/shop.models";
import { pagination } from "@/interfaces/common.interface";

const state: shopState = {
  oneProduct: defaultProduct,
  products: [],
  popularProducts: [],
  productsRandom: [],
  categories: [],
  category: defaultCategory,
  pagination: {
    current_page: 1,
    from: 1,
    last_page: 1,
    path: "",
    per_page: 4,
    to: 1,
    total: 1,
  },
  shopError: "",
};

const getters = {
  error: (state: shopState) => {
    return state.shopError;
  },
  getOneProduct: (state: shopState) => {
    return state.oneProduct;
  },
  getProducts: (state: shopState) => {
    return state.products;
  },
  getPopularProducts: (state: shopState) => {
    return state.popularProducts;
  },
  getRandomProducts: (state: shopState) => {
    return state.productsRandom;
  },
  getCategories: (state: shopState) => {
    return state.categories;
  },
  getPagination: (state: shopState) => {
    return state.pagination;
  },
};

const actions = {
  async fetchCategories(context: any) {
    try {
      const { data } = await ShopService.getCategories();
      context.commit("setCategories", data);
      return Promise.resolve(data);
    } catch (e) {
      if (e instanceof ShopError) {
        context.commit("dataError", {
          errorMessage: e.errorMessage || e.message,
          responseErrorCode: e.errorCode,
        });
      }
      return Promise.reject();
    }
  },
  async fetchProducts(context: any, dataSet: productsRequest) {
    try {
      const { data, meta: pagination } = await ShopService.getProducts(dataSet);
      if (dataSet.isInfiniteScroll) {
        context.commit("pushToProducts", data);
      } else {
        context.commit("setProducts", data);
      }
      context.commit("setPagination", pagination);
      return Promise.resolve(data);
    } catch (e) {
      if (e instanceof ShopError) {
        context.commit("dataError", {
          errorMessage: e.errorMessage || e.message,
          responseErrorCode: e.errorCode,
        });
      }
      return Promise.reject();
    }
  },
  async fetchPopularProducts(context: any) {
    try {
      const { data } = await ShopService.getPopularProducts();
      context.commit("setPopularProducts", data);
      return Promise.resolve(data);
    } catch (e) {
      if (e instanceof ShopError) {
        context.commit("dataError", {
          errorMessage: e.errorMessage || e.message,
          responseErrorCode: e.errorCode,
        });
      }
      return Promise.reject();
    }
  },
  async fetchProductsRandom(context: any) {
    try {
      const { data } = await ShopService.getProductsRandom();
      context.commit("setProductsRandom", data);
      return Promise.resolve(data);
    } catch (e) {
      if (e instanceof ShopError) {
        context.commit("dataError", {
          errorMessage: e.errorMessage || e.message,
          responseErrorCode: e.errorCode,
        });
      }
      return Promise.reject();
    }
  },
  async fetchOneProduct(context: any, productId: number) {
    try {
      const { data } = await ShopService.getOneProduct(productId);
      context.commit("setOneProduct", data);
      return Promise.resolve(data);
    } catch (e) {
      if (e instanceof ShopError) {
        context.commit("dataError", {
          errorMessage: e.errorMessage || e.message,
          responseErrorCode: e.errorCode,
        });
      }
      return Promise.reject();
    }
  },
  async buyProduct(context: any, productId: number) {
    try {
      const { data } = await ShopService.buyOneProduct(productId);
      return Promise.resolve(data);
    } catch (e) {
      if (e instanceof ShopError) {
        context.commit("dataError", {
          errorMessage: e.errorMessage || e.message,
          responseErrorCode: e.errorCode,
        });
      }
      return Promise.reject();
    }
  },
};

const mutations = {
  setCategories(state: shopState, list: Array<category>) {
    state.categories = list;
  },
  setProducts(state: shopState, list: Array<oneProduct>) {
    state.products = list;
  },
  setPopularProducts(state: shopState, list: Array<oneProduct>) {
    state.popularProducts = list;
  },
  setProductsRandom(state: shopState, list: Array<oneProduct>) {
    state.productsRandom = list;
  },
  pushToProducts(state: shopState, list: Array<oneProduct>) {
    state.products.push(...list);
  },
  setOneProduct(state: shopState, data: oneProduct) {
    state.oneProduct = data;
  },
  setPagination(state: shopState, data: pagination) {
    state.pagination = data;
  },
  dataError(state: shopState, { errorMessage }: any) {
    state.shopError = errorMessage;
  },
};

export const shop = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
