<template>
  <ion-header :translucent="true" class="header-back">
    <ion-toolbar>
      <ion-buttons>
        <ion-back-button class="header-back__btn" text=""></ion-back-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import { IonHeader, IonBackButton, IonToolbar, IonButtons } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "GoBack",
  components: {
    IonHeader,
    IonBackButton,
    IonToolbar,
    IonButtons,
  },
});
</script>

<style scoped lang="scss">
.header-back {
  margin: 0 -10px;
  &:after {
    display: none;
  }
}
</style>
