<template>
  <ion-page class="welcome-page">
    <div class="welcome-page__logo">
      <logo-icon :width="200" :height="91" />
    </div>
    <div class="welcome-page__title">Добро пожаловать</div>
    <div class="welcome-page__actions">
      <ion-button
        class="welcome-page__btn"
        type="button"
        size="default"
        router-link="register"
      >
        Регистрироваться
      </ion-button>
      <ion-button
        class="welcome-page__btn no-background"
        type="button"
        size="default"
        fill="outline"
        router-link="/login"
      >
        Войти
      </ion-button>
    </div>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonImg,
  IonThumbnail,
  IonPopover,
  IonIcon,
  IonCheckbox,
  IonText,
  IonRadioGroup,
  IonRadio,
  IonListHeader,
} from "@ionic/vue";

import LogoIcon from "@/assets/svg/Logo.vue";

import { defineComponent, nextTick, reactive, toRefs } from "vue";

export default defineComponent({
  name: "WelcomePage",
  components: {
    IonPage,
    LogoIcon,
    IonButton,
  },
});
</script>

<style scoped lang="scss">
.welcome-page {
  padding: 50px 16px;
  justify-content: flex-start;
  align-items: center;
  &__logo {
    margin-bottom: 40px;
    margin-right: auto;
  }
  &__title {
    font-weight: 700;
    font-size: 32px;
    line-height: 44px;
    color: #333333;
    margin-bottom: 24px;
  }
  &__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  &__btn {
    margin-bottom: 16px;
    width: 280px;
  }
}
</style>
