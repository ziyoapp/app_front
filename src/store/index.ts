import { createStore } from "vuex";
import { auth } from "./auth.store";
import { news } from "@/store/news.store";
import { events } from "@/store/events.store";
import { userModule } from "@/store/user.store";
import { storyModule } from "@/store/story.store";
import { shop } from "@/store/shop.store";
import { TextResult } from "capacitor-plugin-dynamsoft-barcode-reader";

export const store = createStore({
  state: {
    pusherConnectionStatus: "empty",
    commonError: "",
    qrCode: {
      QRCodeOnly: true,
      continuousScan: false,
      barcodeResults: [] as TextResult[],
    },
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
  actions: {},
  modules: {
    auth,
    news,
    events,
    userModule,
    shop,
    storyModule,
  },
});
