import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "@/store";

import GoBack from "@/components/GoBack.vue";
import AppHeader from "@/components/HeaderComponent.vue";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";
// import "./assets/stlyes/global.scss";

import ApiService from "@/services/api.service";
import { Preferences } from "@capacitor/preferences";
import { TOKEN_KEY } from "@/shared/constants";

const app = createApp(App).use(IonicVue).use(router).use(store);

ApiService.init(process.env.VUE_APP_SERVER);

Preferences.get({ key: TOKEN_KEY }).then(async ({ value }) => {
  if (value) {
    ApiService.setHeader(value);
    ApiService.mountRequestInterceptor();
    ApiService.mount401Interceptor();
  }

  app.component("go-back", GoBack);
  app.component("app-header", AppHeader);

  router.isReady().then(() => {
    app.mount("#app");
  });
});
