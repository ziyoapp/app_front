<template>
  <ion-page class="settings-page">
    <app-header
      :has-logo="false"
      :has-menu="false"
      :has-share="true"
      :has-notify="false"
      :has-search="false"
      has-title
      title="Настройки"
    />
    <div class="settings-page__content">
      <ion-content :fullscreen="true">
        <div class="settings-page__list">
          <ion-item
            class="default"
            button
            :detail="true"
            router-direction="forward"
            router-link="/tabs/profile"
          >
            <ion-icon :icon="personOutline" slot="start"></ion-icon>
            <ion-label> Профиль </ion-label>
          </ion-item>
          <ion-item
            class="default"
            button
            :detail="true"
            router-direction="forward"
            router-link="/tabs/development"
          >
            <ion-icon :icon="lockClosedOutline" slot="start"></ion-icon>
            <ion-label> Безопасность </ion-label>
          </ion-item>
          <ion-item
            class="default"
            button
            :detail="true"
            router-direction="forward"
            router-link="/tabs/notifications"
          >
            <ion-icon :icon="notificationsOutline" slot="start"></ion-icon>
            <ion-label> Уведомления </ion-label>
          </ion-item>
          <ion-item
            class="default"
            button
            :detail="true"
            router-direction="forward"
            router-link="/tabs/development"
          >
            <ion-icon :icon="globeOutline" slot="start"></ion-icon>
            <ion-label> Язык приложения </ion-label>
          </ion-item>
          <ion-item
            class="default"
            button
            :detail="true"
            router-direction="forward"
            router-link="/tabs/info"
          >
            <ion-icon :icon="alertCircleOutline" slot="start"></ion-icon>
            <ion-label> Информация о приложении </ion-label>
          </ion-item>
        </div>
        <div class="settings-page__footer">
          <span>Согласие на обработку данных</span>
          <span>Публичная оферта</span>
          <span>Политика конфиденциальности</span>
        </div>
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  personOutline,
  lockClosedOutline,
  notificationsOutline,
  globeOutline,
  alertCircleOutline,
} from "ionicons/icons";

import { IonContent, IonIcon, IonItem, IonPage, IonLabel } from "@ionic/vue";

export default defineComponent({
  name: "SettingsPage",
  components: {
    IonPage,
    IonContent,
    IonItem,
    IonIcon,
    IonLabel,
  },
  setup() {
    return {
      personOutline,
      lockClosedOutline,
      notificationsOutline,
      globeOutline,
      alertCircleOutline,
    };
  },
});
</script>

<style scoped lang="scss">
.settings-page {
  height: 100%;
  &__content {
    height: 100%;
    ion-item {
      --border-width: 0;
      --border-color: transparent;
      --border: none;
      margin-bottom: 15px;
    }
  }
  &__list {
    height: calc(100% - 152px);
  }
  &__footer {
    padding: 16px 14px;
    margin-top: auto;
    display: flex;
    flex-direction: column;

    span {
      font-weight: 400;
      font-size: 10px;
      line-height: 40px;
      text-decoration-line: underline;
      color: #61c000;
    }
  }
}
</style>
