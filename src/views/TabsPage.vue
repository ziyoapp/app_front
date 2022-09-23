<template>
  <ion-page>
    <ion-tabs class="tabs-main">
      <ion-router-outlet></ion-router-outlet>
      <div slot="top" class="qr-btn-wrap">
        <ion-fab-button class="qr-btn" shape="round">
          <ion-icon :icon="qrCodeOutline" />
        </ion-fab-button>
      </div>
      <ion-tab-bar slot="bottom">
        <div class="tabs-main__btns">
          <ion-tab-button tab="tab1" href="/tabs/main">
            <ion-icon :icon="homeOutline" />
            <ion-label>Главная</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab2" href="/tabs/tab2">
            <ion-icon :icon="cartOutline" />
            <ion-label>Магазин</ion-label>
          </ion-tab-button>
        </div>

        <div class="tabs-main__btns">
          <ion-tab-button tab="tab3" href="/tabs/tab3">
            <ion-icon :icon="calendarClearOutline" />
            <ion-label>События</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab4" href="/tabs/tab4">
            <ion-icon :icon="schoolOutline" />
            <ion-label>Гранты</ion-label>
          </ion-tab-button>
        </div>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonFabButton,
} from "@ionic/vue";
import {
  homeOutline,
  cartOutline,
  calendarClearOutline,
  schoolOutline,
  qrCodeOutline,
} from "ionicons/icons";

export default defineComponent({
  name: "TabsPage",
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
    IonFabButton,
  },
  setup() {
    return {
      homeOutline,
      cartOutline,
      calendarClearOutline,
      schoolOutline,
      qrCodeOutline,
    };
  },
});
</script>

<style lang="scss">
.tabs-main {
  &__btns {
    display: flex;
    align-items: center;
    flex: 1 1 50%;
    height: 100%;

    &:first-child {
      padding-right: 38px;
    }
    &:last-child {
      padding-left: 38px;
    }
  }
  .qr-btn-wrap {
    width: 64px;
    height: 64px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
    margin-left: -32px;
    top: auto;
    bottom: 30px;
    z-index: 11;

    &::before {
      content: "";
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-38px, 0px);
      height: 38px;
      width: 76px;
      border-radius: 0 0 57px 57px;
    }
  }
  .qr-btn {
    --background: #001a35;
    --border-radius: 50%;

    ion-icon {
      width: 20px;
      height: 20px;
    }
  }
  ion-tab-button {
    background: #001a35;
    color: #fff;
  }

  ion-tab-bar {
    background: #001a35;
    height: 61px;
  }
}
</style>
