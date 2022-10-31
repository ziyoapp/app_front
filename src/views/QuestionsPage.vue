<template>
  <ion-page class="questions-page">
    <app-header
      :has-logo="false"
      :has-menu="false"
      :has-share="true"
      :has-notify="false"
      :has-search="false"
      has-title
      title="Часто задаваемые вопросы"
    />
    <div class="questions-page__content">
      <ion-content>
        <ion-accordion-group>
          <ion-accordion
            class="questions-page__accordion"
            value="first"
            :toggle-icon="chevronDownCircleOutline"
          >
            <ion-item slot="header" class="questions-page__item default">
              <ion-label>Как можно заработать Ziyocoin?</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">
              - Для того, чтобы заработать Ziyocoin вам нужно посетить событие
              проходящее в здании Ziyoforum и дать отсканировать свой уникальный
              QR код при входе, также можно выполнять задания которые появляются
              в приложении.
            </div>
          </ion-accordion>
          <ion-accordion value="second" :toggle-icon="chevronDownCircleOutline">
            <ion-item slot="header" class="questions-page__item default">
              <ion-label
                >На что можно потратить заработанные Ziyocoin?</ion-label
              >
            </ion-item>
            <div class="ion-padding" slot="content">
              - Обменять заработанные Ziyocoin можно на мерч от Ziyoforum,
              скидки от партнеров и на возмонжость посетить эксклюзивные
              события.
            </div>
          </ion-accordion>
          <ion-accordion value="third" :toggle-icon="chevronDownCircleOutline">
            <ion-item slot="header" class="questions-page__item default">
              <ion-label>Можно ли купить Ziyocoin за деньги?</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">
              - Нет, Ziyocoin можно только заработать спосособами описанными
              выше.
            </div>
          </ion-accordion>
          <ion-accordion value="fourth" :toggle-icon="chevronDownCircleOutline">
            <ion-item slot="header" class="questions-page__item default">
              <ion-label
                >В каких регионах вы осуществляете свою деятельность?</ion-label
              >
            </ion-item>
            <div class="ion-padding" slot="content">
              - В настоящее время мы работаем по всей территории Республики
              Узбекистан.
            </div>
          </ion-accordion>
        </ion-accordion-group>
        <ion-button
          color="success-2"
          class="ion-margin-top _submit-btn"
          expand="block"
          router-direction="forward"
          router-link="/tabs/questions-form"
        >
          <span> Задать вопрос </span>
        </ion-button>
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import {
  IonContent,
  IonPage,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/vue";

import { chevronDownCircleOutline } from "ionicons/icons";

export default defineComponent({
  name: "QuestionsPage",
  components: {
    IonContent,
    IonPage,
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonLabel,
    IonButton,
  },
  setup() {
    return {
      chevronDownCircleOutline,
    };
  },
});
</script>

<style scoped lang="scss">
.questions-page {
  height: 100%;
  &__content {
    height: 100%;
  }
  ion-label {
    font-size: 15px;
    line-height: 22px;
    color: #333333;
    font-family: MuseoSansCyrl-500, serif;
  }
  ion-item {
    --background: #f0f9e6;
    --border: none;
    --border-color: transparent;
  }
  ion-accordion {
    background: #f0f9e6;
    margin-bottom: 10px;
    border-radius: 12px;
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    color: #333333;
    font-family: MuseoSansCyrl-500, serif;
    padding-left: 15px;
  }
}
</style>
