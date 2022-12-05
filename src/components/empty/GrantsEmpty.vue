<template>
  <ion-card class="empty-dev">
    <empty-clip-board />
    <ion-card-header>
      <ion-card-title> Грантов пока нет... </ion-card-title>
    </ion-card-header>

    <ion-card-content> Здесь будут гранты. </ion-card-content>
    <ion-button @click="goHome" color="success-2 empty-dev__btn" expand="block">
      Перейти на главную
    </ion-button>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/vue";

import EmptyClipBoard from "@/assets/svg/EmptyClipBoard.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "DevelopmentEmpty",
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    EmptyClipBoard,
    IonButton,
  },
  setup() {
    const router = useRouter();

    const goHome = () => {
      router.push("/");
    };

    return { goHome };
  },
});
</script>

<style scoped lang="scss">
.empty-dev {
  display: flex;
  flex-direction: column;

  &__btn {
    --border-radius: 10px;
    width: 100%;
    margin-top: 20px;
    max-width: 500px;
  }

  ion-card-title {
    font-family: MuseoSansCyrl-700, serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #0a1938;
  }

  ion-card-content {
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    color: #0a1938;
  }
}
ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}
</style>
