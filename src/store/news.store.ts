import {
  newsGetRequest,
  newsState,
  news as oneNews,
} from "@/interfaces/news.interface";
import { NewsError, NewsService } from "@/services/news.services";
import { pagination } from "@/interfaces/common.interface";

import { defaultNews } from "@/models/news.models";

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
  oneNews: defaultNews,
};

const getters = {
  error: (state: { newsError: any }) => {
    return state.newsError;
  },
  getOne: (state: newsState): oneNews => {
    return state.oneNews;
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

  async fetchOne(context: any, news_id: number) {
    try {
      const { data } = await NewsService.getOne(news_id);
      context.commit("setOne", data);
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
  setOne(state: newsState, data: oneNews) {
    state.oneNews = data;
  },
};

export const news = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
