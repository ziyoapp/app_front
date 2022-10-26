<template>
  <ion-page class="info-page">
    <app-header
      :has-logo="false"
      :has-menu="false"
      :has-share="true"
      :has-notify="false"
      :has-search="false"
      has-title
      title="Информация о приложении"
    />
    <div class="info-page__content">
      <ion-content :fullscreen="true">
        <div class="info-page__wrap">
          <div class="info-page__title">О приложени</div>
          <div class="info-page__text">
            Версия - 1.0 <br />
            Разработкик - ZIYO FORUM
          </div>
        </div>
        <div class="info-page__wrap">
          <div class="info-page__title">Пользовательское соглашение</div>
          <div class="info-page__text">
            Пользовательское соглашение (англ. end-user license agreement —
            «лицензионное соглашение с конечным пользователем»; сокращается до
            EULA) — договор между владельцем компьютерной программы и
            пользователем её копии.
          </div>
        </div>
        <div class="info-page__wrap">
          <div class="info-page__title">Политика конфиденциальности</div>
          <div class="info-page__text">
            В политике конфиденциальности прописывают, какую информацию и с
            какой целью собирают. Сообщают также, какое действие считается
            согласием на обработку персональных данных. В политике
            конфиденциальности прописывают, какую информацию и с какой целью
            собирают. Сообщают также, какое действие считается согласием на
            обработку персональных данных. В политике конфиденциальности
            прописывают, какую информацию и с какой целью собирают. Сообщают
            также, какое действие считается согласием на обработку персональных
            данных.
          </div>
        </div>
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { IonContent, IonPage } from "@ionic/vue";

export default defineComponent({
  name: "InfoPage",
  components: {
    IonPage,
    IonContent,
  },
});
</script>

<style scoped lang="scss">
.info-page {
  height: 100%;
  &__content {
    height: 100%;
  }
  &__title {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #0a1938;
    margin-bottom: 15px;
  }
  &__text {
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: #0a1938;
  }
  &__wrap {
    margin-bottom: 24px;
  }
}
</style>
