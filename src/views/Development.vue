<template>
  <ion-page class="not-found">
    <app-header
      :has-logo="false"
      :has-menu="false"
      :has-search="false"
      :has-notify="false"
    />
    <div class="not-found__content">
      <ion-content :fullscreen="true">
        <ion-card>
          <div>
            <div>
              <ion-card-title>
                Данный раздел находится в разработке
              </ion-card-title>
            </div>
            <div>
              <ion-card-header> Следите за новостями </ion-card-header>
            </div>
          </div>
        </ion-card>
      </ion-content>
    </div>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/vue";

export default defineComponent({
  name: "DevelopmenPage",
  components: { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle },
});
</script>

<style scoped lang="scss">
.not-found {
  height: 100%;
  &__content {
    height: 100%;
  }
  ion-card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
  }
}
</style>
