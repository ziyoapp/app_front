import {
  bonusHistory,
  bonusHistoryGetRequest,
  user,
  userState,
} from "@/interfaces/user.interface";
import { UserServices, UserError } from "@/services/user.services";
import { userDefault } from "@/models/user.models";
import { pagination } from "@/interfaces/common.interface";

const state: userState = {
  user: userDefault,
  qrCode: "",
  userError: "",
  bonus: 0,
  transactions: [],
  bonusPagination: {
    current_page: 1,
    from: 1,
    last_page: 1,
    path: "",
    per_page: 10,
    to: 1,
    total: 1,
  },
};

const getters = {
  error: (state: userState) => {
    return state.userError;
  },
  getUser: (state: userState) => {
    return state.user;
  },
  getCode: (state: userState) => {
    return state.qrCode;
  },
  getBonus: (state: userState) => {
    return state.bonus;
  },
  getTransactions: (state: userState) => {
    return state.transactions;
  },
  getTransactionsPagination: (state: userState) => {
    return state.bonusPagination;
  },
};

const actions = {
  async fetchUser(context: any) {
    try {
      const { data } = await UserServices.getUser();
      context.commit("setUser", data);
    } catch (e) {
      if (e instanceof UserError) {
        context.commit("dataError", {
          errorMessage: e.errorMessage || e.message,
          responseErrorCode: e.errorCode,
        });
      }
      return Promise.reject();
    }
  },
  async fetchQrCode(context: any) {
    try {
      const { qr_code } = await UserServices.getQrCode();
      context.commit("setCode", qr_code);
    } catch (e) {
      if (e instanceof UserError) {
        context.commit("dataError", {
          errorMessage: e.errorMessage || e.message,
          responseErrorCode: e.errorCode,
        });
      }
      return Promise.reject();
    }
  },
  async fetchBonus(context: any) {
    try {
      const { ball: bonus } = await UserServices.getBonus();
      context.commit("setBonus", bonus);
    } catch (e) {
      if (e instanceof UserError) {
        context.commit("dataError", {
          errorMessage: e.errorMessage || e.message,
          responseErrorCode: e.errorCode,
        });
      }
      return Promise.reject();
    }
  },
  async fetchTransactions(context: any, dataSet: bonusHistoryGetRequest) {
    try {
      const { data, meta: pagination } = await UserServices.getBonusHistory(
        dataSet
      );
      if (dataSet.isInfiniteScroll) {
        context.commit("pushTransactions", data);
      } else {
        context.commit("setTransactions", data);
      }
      context.commit("setPagination", pagination);
    } catch (e) {
      if (e instanceof UserError) {
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
  setUser(state: userState, data: user) {
    state.user = data;
  },
  setCode(state: userState, data: string) {
    state.qrCode = data;
  },
  setBonus(state: userState, data: number) {
    state.bonus = data;
  },
  dataError(state: userState, { errorMessage }: any) {
    state.userError = errorMessage;
  },
  setPagination(state: userState, pagination: pagination) {
    state.bonusPagination = pagination;
  },
  pushTransactions(state: userState, data: Array<bonusHistory>) {
    state.transactions.push(...data);
  },
  setTransactions(state: userState, data: Array<bonusHistory>) {
    state.transactions = data;
  },
};

export const userModule = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
