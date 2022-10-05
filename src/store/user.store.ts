import { user, userState } from "@/interfaces/user.interface";
import { UserServices, UserError } from "@/services/user.services";
import { userDefault } from "@/models/user.models";

const state: userState = {
  user: userDefault,
  qrCode: "",
  userError: "",
};

const getters = {
  error: (state: userState) => {
    return state.userError;
  },
  getUser: (state: userState) => {
    return state.user;
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
};

const mutations = {
  setUser(state: userState, data: user) {
    state.user = data;
  },
};

export const userModule = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};