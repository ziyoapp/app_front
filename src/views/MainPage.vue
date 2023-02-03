<template>
  <ion-page class="main-page">
    <div class="main-page__content">
      <ion-content :fullscreen="true">
        <ion-refresher
          slot="fixed"
          @ionRefresh="doRefresh($event)"
          pull-factor="0.5"
          pull-min="100"
          pull-max="200"
        >
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <header-component />
        <stories-slider />
        <events-list
          class="main-page__events"
          :list="eventsList"
          :loading="eventsLoading"
        />
        <news-list
          v-if="newsList.length"
          class="main-page__news"
          :list="newsList"
          :loading="newsLoading"
        />
        <tasks-list class="main-page__tasks" :loading="newsLoading" />
        <banner-pic class="main-page__banner" />
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useUserCompositions } from "@/compositions/useUserCompositions";

import {
  IonPage,
  IonContent,
  loadingController,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";

import HeaderComponent from "@/components/HeaderComponent.vue";
import NewsList from "@/components/main/NewsList.vue";
import EventsList from "@/components/main/EventsList.vue";
import StoriesSlider from "@/components/main/StoriesSlider.vue";
import TasksList from "@/components/main/Tasks.vue";
import BannerPic from "@/components/main/BannerPic.vue";

export default defineComponent({
  name: "MainPage",
  components: {
    IonPage,
    IonContent,
    HeaderComponent,
    NewsList,
    EventsList,
    StoriesSlider,
    IonRefresher,
    IonRefresherContent,
    TasksList,
    BannerPic,
  },
  setup() {
    const userCompositions = useUserCompositions();
    const store = useStore();
    const route = useRoute();

    const localState = reactive({
      newsLoading: false,
      eventsLoading: false,
    });

    const bonus = computed(() => {
      return store.getters["userModule/getBonus"];
    });

    const newsList = computed(() => {
      return store.getters["news/getShortList"];
    });

    const eventsList = computed(() => {
      return store.getters["events/getShortList"];
    });

    const initData = async () => {
      localState.newsLoading = true;
      localState.eventsLoading = true;
      const loading = await loadingController.create({});
      await loading.present();
      await store.dispatch("userModule/fetchUser").finally(() => {
        loading.dismiss();
      });
      store
        .dispatch("events/fetchShortList")
        .finally(() => (localState.eventsLoading = false));
      store
        .dispatch("news/fetchShortList")
        .finally(() => (localState.newsLoading = false));
      store.dispatch("storyModule/fetchStories");
    };

    const doRefresh = (event: CustomEvent) => {
      initData().finally(() => {
        // @ts-ignore
        if (event.target?.complete) {
          // @ts-ignore
          event.target.complete();
        }
      });
    };

    initData();

    watch(
      () => route.path,
      (val) => {
        if (val === "/tabs/main") {
          if (!newsList.value.length || !eventsList.value.length) {
            initData();
          }
          if (!bonus.value) {
            store.dispatch("userModule/fetchBonus");
          }
        }
      }
    );

    return {
      ...toRefs(localState),
      logOut: userCompositions.logOut,
      doRefresh,
      newsList,
      eventsList,
      route,
    };
  },
});
</script>

<style scoped lang="scss">
.main-page {
  height: 100%;
  padding-right: 0;
  &__content {
    height: 100%;
  }
  &__events {
    margin-bottom: 25px;
  }
  &__tasks {
    margin-top: 30px;
    padding-right: 10px;
  }
  &__news {
    padding-right: 10px;
  }
  &__banner {
    margin-right: 10px;
  }
}
</style>
