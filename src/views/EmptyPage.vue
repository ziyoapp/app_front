<template>
  <ion-page class="not-found">
    <app-header
      :has-logo="false"
      :has-menu="false"
      :has-search="true"
      :has-notify="true"
      :has-title="true"
      title="Гранты"
    />
    <div class="not-found__content">
      <ion-content :fullscreen="true">
        <grants-empty
          title="Данного раздела пока нет ..."
          text="Следите за новостями"
        />
      </ion-content>
    </div>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";

import GrantsEmpty from "@/components/empty/GrantsEmpty.vue";

export default defineComponent({
  name: "EmptyPage",
  components: {
    IonPage,
    IonContent,
    GrantsEmpty,
  },
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
