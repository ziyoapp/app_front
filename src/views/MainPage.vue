<template>
  <ion-page class="main-page">
    <div class="main-page__content">
      <ion-content :fullscreen="true">
        <h1>main page</h1>
        <ion-button @click="logOut">Log out</ion-button>
      </ion-content>
    </div>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { useUserCompositions } from "@/compositions/useUserCompositions";
import { IonPage, IonContent, IonButton } from "@ionic/vue";

export default defineComponent({
  name: "MainPage",
  components: {
    IonPage,
    IonContent,
    IonButton,
  },
  setup() {
    const userCompositions = useUserCompositions();

    return {
      logOut: userCompositions.logOut,
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
