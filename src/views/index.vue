<template>
  <ion-page>
    <ion-nav :root="MainPage" />
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonNav, IonPage } from "@ionic/vue";

import MainPage from "./MainPage";

export default defineComponent({
  name: "index",
  components: { IonNav, IonPage },
  setup() {
    return {
      MainPage,
    };
  },
});
</script>
