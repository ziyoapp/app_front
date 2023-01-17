<template>
  <ion-page :class="{ 'root-page': route.name !== 'Scanner' }">
    <ion-tabs class="tabs-main">
      <ion-router-outlet></ion-router-outlet>
      <div
        v-if="!pagesWithForm.includes(String(route.name))"
        slot="top"
        class="qr-btn-wrap"
        :class="{ _ios: isPlatform('ios') }"
      >
        <ion-fab-button
          v-if="isAdminOrModerator"
          class="qr-btn"
          shape="round"
          router-direction="forward"
          @click="openScan"
        >
          <ion-icon :icon="scanOutline" />
        </ion-fab-button>
        <ion-fab-button
          v-else-if="isUser"
          class="qr-btn"
          shape="round"
          router-direction="forward"
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
    <ion-modal :is-open="qrModal" id="qr-modal">
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
        @click="qrModal = false"
      >
        <ion-icon :icon="close" />
      </ion-fab-button>
    </ion-modal>
    <ion-modal :is-open="eventsModal" class="events-modal">
      <ion-header>
        <ion-toolbar>
          <ion-title>Выберите событие</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="eventsModal = false">закрыть</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item
            v-for="(event, index) in events"
            :key="index"
            class="default"
            @click="selectEventToAddPoint(event)"
          >
            <ion-avatar slot="start">
              <ion-img :src="event.image_url"></ion-img>
            </ion-avatar>
            <ion-label>
              <h2>
                {{ event.title }}
              </h2>
              <p>{{ event.description }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, reactive, toRefs } from "vue";
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
  IonToolbar,
  IonHeader,
  IonTitle,
  IonAvatar,
  IonItem,
  IonImg,
  IonList,
  IonContent,
  IonButtons,
  IonButton,
} from "@ionic/vue";
import {
  homeOutline,
  cartOutline,
  calendarClearOutline,
  schoolOutline,
  qrCodeOutline,
  scanOutline,
  close,
} from "ionicons/icons";
import { useStore } from "vuex";

import UserComponent from "@/components/UserComponent.vue";
import { useUserCompositions } from "@/compositions/useUserCompositions";
import { useRoute, useRouter } from "vue-router";

import { event } from "@/interfaces/events.interface";

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
    IonToolbar,
    IonHeader,
    IonTitle,
    IonAvatar,
    IonItem,
    IonImg,
    IonList,
    IonContent,
    IonButtons,
    IonButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const userComposition = useUserCompositions();

    const localState = reactive({
      qrLoading: false,
      eventsModal: false,
      qrModal: false,
      events: [],
      qrUserId: null,
      pagesWithForm: ["Profile", "QuestionsForm", "ChangePassword"],
    });

    const modal = ref(null);

    const qrCode = computed(() => {
      return store.getters["userModule/getCode"];
    });

    const getQrCode = async () => {
      localState.qrModal = false;
      localState.qrLoading = true;
      store.dispatch("userModule/fetchQrCode").finally(() => {
        localState.qrLoading = false;
        localState.qrModal = true;
      });
    };

    const openScan = () => {
      router.push("/scanner");
    };

    const dismiss = () => {
      console.log(modal?.value);
      if (modal?.value) {
        // @ts-ignore
        modal.value.$el.dismiss();
      }
    };

    const openScanModal = async () => {
      if (!store.state.qrCode?.barcodeResults[0]?.barcodeText) {
        return;
      }
      try {
        const jsonResult = await JSON.parse(
          store.state.qrCode.barcodeResults[0]?.barcodeText
        );
        if (jsonResult.user_id) {
          localState.qrUserId = jsonResult.user_id;
          await store
            .dispatch("events/getActiveEvents", jsonResult.user_id)
            .then((data) => {
              if (data?.length) {
                localState.events = data;
                localState.eventsModal = true;
              } else {
                userComposition.showNotify({
                  type: "success",
                  duration: 3000,
                  position: "bottom",
                  message: "Нет активных событий",
                });
              }
              store.state.qrCode = {
                QRCodeOnly: true,
                continuousScan: false,
                barcodeResults: [],
              };
            });
        } else {
          await showIncorrectQrNotify();
        }
      } catch (e: any) {
        await showIncorrectQrNotify();
      }
    };

    const showIncorrectQrNotify = () => {
      userComposition.showNotify({
        type: "danger",
        duration: 3000,
        position: "bottom",
        message: "Не корректный QR-code",
      });
    };

    const selectEventToAddPoint = (event: event) => {
      store
        .dispatch("events/setPoints", {
          userId: localState.qrUserId,
          eventId: event.id,
        })
        .then(() => {
          userComposition.showNotify({
            type: "success",
            duration: 2000,
            position: "bottom",
            message: "Баллы начислены",
          });
        })
        .catch((err) => {
          userComposition.showNotify({
            type: "danger",
            duration: 2000,
            position: "middle",
            message: err || store.getters["events/error"],
          });
        })
        .finally(() => {
          localState.eventsModal = false;
        });
    };

    watch(
      () => route.path,
      () => {
        if (route.name === "Main") {
          setTimeout(() => {
            openScanModal();
          });
        }

        const rootElement = document.querySelector("html");
        if (route.name === "Scanner") {
          if (rootElement) {
            rootElement.classList.add("scan");
          }
        } else {
          if (rootElement) {
            rootElement.classList.remove("scan");
          }
        }
      }
    );

    return {
      ...toRefs(localState),
      getQrCode,
      dismiss,
      openScan,
      openScanModal,
      selectEventToAddPoint,
      isAdminOrModerator: userComposition.isAdminOrModerator,
      isUser: userComposition.isUser,
      isPlatform,
      qrCode,
      route,
      modal,
      scanOutline,
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
.root-page {
  background: #f5f5f5;
}
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
