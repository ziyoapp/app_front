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
          <h1>404 not found</h1>
        </ion-card>
      </ion-content>
    </div>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonPage, IonContent, IonCard } from "@ionic/vue";

export default defineComponent({
  name: "NotFoundPage",
  components: { IonPage, IonContent, IonCard },
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
  }
}
</style>
