import {
  newsGetRequest,
  newsState,
  news as oneNews,
} from "@/interfaces/news.interface";
import { NewsError, NewsService } from "@/services/news.services";
import { pagination } from "@/interfaces/common.interface";

const state: newsState = {
  shortList: [],
  list: [],
  newsError: "",
  pagination: {
    current_page: 1,
    from: 1,
    last_page: 1,
    path: "",
    per_page: 4,
    to: 1,
    total: 1,
  },
};

const getters = {
  error: (state: { newsError: any }) => {
    return state.newsError;
  },
  getShortList: (state: newsState) => {
    return state.shortList;
  },
  getAll: (state: newsState) => {
    return state.list;
  },
  getPagination(state: newsState) {
    return state.pagination;
  },
};

const actions = {
  async fetchShortList(context: any, dataSet: newsGetRequest) {
    try {
      const { data } = await NewsService.getLatest(dataSet);
      context.commit("setLatest", data);
      return Promise.resolve(data);
    } catch (e) {
      if (e instanceof NewsError) {
        context.commit("dataError", {
          errorMessage: e.errorMessage || e.message,
          responseErrorCode: e.errorCode,
        });
      }
      return Promise.reject();
    }
  },
  async fetchAll(
    context: any,
    dataSet: {
      data: newsGetRequest;
      isInfiniteScroll: false;
    }
  ) {
    try {
      const { data, meta: pagination } = await NewsService.getAll(dataSet.data);
      if (dataSet.isInfiniteScroll) {
        context.commit("pushToAll", data);
      } else {
        context.commit("setAll", data);
      }
      context.commit("setPagination", pagination);
      return Promise.resolve(data);
    } catch (e) {
      if (e instanceof NewsError) {
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
  setLatest(state: newsState, list: Array<oneNews>) {
    state.shortList = list;
  },
  setPagination(state: newsState, pagination: pagination) {
    state.pagination = pagination;
  },
  setAll(state: newsState, list: Array<oneNews>) {
    state.list = list;
  },
  pushToAll(state: newsState, list: Array<oneNews>) {
    state.list.push(...list);
  },
};

export const news = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
