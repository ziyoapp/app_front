<template>
  <ion-page class="main-page">
    <div class="main-page__content">
      <ion-content :fullscreen="true">
        <header-component />
        <events-list class="main-page__events" :list="eventsList" />
        <news-list :list="newsList" />
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { useUserCompositions } from "@/compositions/useUserCompositions";

import { IonPage, IonContent, loadingController } from "@ionic/vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import NewsList from "@/components/main/NewsList.vue";
import EventsList from "@/components/main/EventsList.vue";

export default defineComponent({
  name: "MainPage",
  components: {
    IonPage,
    IonContent,
    // IonButton,
    HeaderComponent,
    NewsList,
    EventsList,
  },
  setup() {
    const userCompositions = useUserCompositions();
    const store = useStore();

    const newsList = computed(() => {
      return store.getters["news/getShortList"];
    });

    const eventsList = computed(() => {
      return store.getters["events/getShortList"];
    });

    const initData = async () => {
      const loading = await loadingController.create({
        message: "Загрузка...",
      });
      await loading.present();
      await store.dispatch("userModule/fetchUser").finally(() => {
        loading.dismiss();
      });
      store.dispatch("events/fetchShortList");
      store.dispatch("news/fetchShortList");
    };

    initData();

    return {
      logOut: userCompositions.logOut,
      newsList,
      eventsList,
    };
  },
});
</script>

<style scoped lang="scss">
.main-page {
  height: 100%;
  &__content {
    height: 100%;
  }
  &__events {
    margin-bottom: 25px;
  }
}
</style>
