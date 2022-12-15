<template>
  <ion-page>
    <ion-tabs class="tabs-main">
      <ion-router-outlet></ion-router-outlet>
      <div slot="top" class="qr-btn-wrap" :class="{ _ios: isPlatform('ios') }">
        <ion-fab-button
          class="qr-btn"
          shape="round"
          router-direction="forward"
          id="open-qr-dialog"
          @click="getQrCode"
        >
          <ion-icon :icon="qrCodeOutline" />
        </ion-fab-button>
      </div>
      <ion-tab-bar slot="bottom">
        <div class="tabs-main__btns">
          <ion-tab-button
            tab="tab1"
            @click="$router.push('/tabs/main')"
            :selected="$route.name === 'Main'"
          >
            <ion-icon :icon="homeOutline" />
            <ion-label>Главная</ion-label>
          </ion-tab-button>

          <ion-tab-button
            tab="tab2"
            @click="$router.push('/tabs/shop')"
            :selected="$route.name === 'Shop'"
          >
            <ion-icon :icon="cartOutline" />
            <ion-label>Магазин</ion-label>
          </ion-tab-button>
        </div>

        <div class="tabs-main__btns">
          <ion-tab-button
            tab="tab3"
            @click="$router.push('/tabs/events')"
            :selected="$route.name === 'Events'"
          >
            <ion-icon :icon="calendarClearOutline" />
            <ion-label>События</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab4" @click="$router.push('/tabs/grants')">
            <ion-icon :icon="schoolOutline" />
            <ion-label>Гранты</ion-label>
          </ion-tab-button>
        </div>
      </ion-tab-bar>
    </ion-tabs>
    <ion-modal id="qr-modal" ref="modal" trigger="open-qr-dialog">
      <div v-if="qrLoading" class="qr-loading">
        <ion-spinner name="crescent"></ion-spinner>
      </div>
      <div v-else class="qr-modal">
        <user-component class="qr-modal__user" />
        <img :src="qrCode" width="230" />
      </div>
      <ion-fab-button
        size="small"
        class="qr-modal__close"
        shape="round"
        @click="dismiss"
      >
        <ion-icon :icon="close" />
      </ion-fab-button>
    </ion-modal>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonFabButton,
  IonModal,
  IonSpinner,
  isPlatform,
} from "@ionic/vue";
import {
  homeOutline,
  cartOutline,
  calendarClearOutline,
  schoolOutline,
  qrCodeOutline,
  close,
} from "ionicons/icons";
import { useStore } from "vuex";

import UserComponent from "@/components/UserComponent.vue";

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
    IonModal,
    IonSpinner,
    UserComponent,
  },
  setup() {
    const store = useStore();

    const qrLoading = ref(false);
    const modal = ref(null);

    const qrCode = computed(() => {
      return store.getters["userModule/getCode"];
    });

    const getQrCode = async () => {
      qrLoading.value = true;
      store.dispatch("userModule/fetchQrCode").finally(() => {
        qrLoading.value = false;
      });
    };

    const dismiss = () => {
      if (modal?.value) {
        // @ts-ignore
        modal.value.$el.dismiss();
      }
    };

    return {
      qrLoading,
      getQrCode,
      dismiss,
      isPlatform,
      qrCode,
      modal,
      homeOutline,
      cartOutline,
      calendarClearOutline,
      schoolOutline,
      qrCodeOutline,
      close,
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

    &._ios {
      bottom: 64px;
    }

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

// qr-code
ion-modal#qr-modal {
  --width: fit-content;
  --min-width: 280px;
  --height: fit-content;
  --border-radius: 10px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  --min-height: 380px;
  --overflow: visivle;
}

ion-modal#qr-modal ion-icon {
  color: #0a1938;
}

.qr-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
}

.qr-modal {
  padding: 28px 25px 25px;

  &__user {
    margin-bottom: 47px;
  }

  &__close {
    position: absolute;
    top: auto;
    left: 50%;
    bottom: -58px;
    margin-left: -28px;
    --background: #fff;
  }
}
</style>
