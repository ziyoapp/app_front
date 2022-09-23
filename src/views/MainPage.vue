<template>
  <ion-page class="main-page">
    <div class="main-page__content">
      <ion-content :fullscreen="true">
        <header-component />
        <news-list :list="newsList" />
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { useUserCompositions } from "@/compositions/useUserCompositions";

import { IonPage, IonContent, IonButton } from "@ionic/vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import NewsList from "@/components/main/NewsList.vue";

export default defineComponent({
  name: "MainPage",
  components: {
    IonPage,
    IonContent,
    // IonButton,
    HeaderComponent,
    NewsList,
  },
  setup() {
    const userCompositions = useUserCompositions();
    const store = useStore();

    const newsList = computed(() => {
      return store.getters["news/getShortList"];
    });

    const initData = async () => {
      store.dispatch("news/fetchShortList");
    };

    initData();

    return {
      logOut: userCompositions.logOut,
      newsList,
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
}
</style>
