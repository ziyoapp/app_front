import { createStore } from "vuex";
import { auth } from "./auth.store";
import { news } from "@/store/news.store";
import { events } from "@/store/events.store";
import { userModule } from "@/store/user.store";

export const store = createStore({
  state: {
    pusherConnectionStatus: "empty",
    commonError: "",
  },
  mutations: {
    dataError(state, { errorMessage }: any) {
      state.commonError = errorMessage;
    },
  },
  getters: {
    commonError: (state: any): string => {
      return state.commonError;
    },
  },
  actions: {
    // async uploadImage(context: any, formData: FormData) {
    //   try {
    //     return await CommonService.uploadImage(formData);
    //   } catch (e) {
    //     if (e instanceof ResponseError) {
    //       context.commit("dataError", {
    //         errorMessage: e.errorMessage,
    //         responseErrorCode: e.errorCode,
    //       });
    //     }
    //     // @ts-expect-error
    //     return e.message;
    //   }
    // },
  },
  modules: {
    auth,
    news,
    events,
    userModule,
  },
});
