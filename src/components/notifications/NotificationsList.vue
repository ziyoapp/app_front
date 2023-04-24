<template>
  <div class="notifications">
    <ion-card
      v-for="(notify, index) in notifications"
      :key="index"
      class="notifications__card"
      @click="openModal(notify)"
    >
      <ion-card-content>
        <ion-card-title class="notifications__title">
          {{ notify.data.title }}
        </ion-card-title>
        <ion-card-subtitle class="notifications__date ion-text-right">
          {{ notify.date }}
        </ion-card-subtitle>
      </ion-card-content>
    </ion-card>
    <ion-modal :is-open="notifyModal">
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ selectedNotify.data.title }}</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="notifyModal = false">Закрыть</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <p class="ion-padding-horizontal">
          {{ selectedNotify.data.content }}
        </p>
      </ion-content>
    </ion-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType, reactive, toRefs } from "vue";
import { notification } from "@/interfaces/user.interface";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";

export default defineComponent({
  name: "NotificationsList",
  components: {
    IonHeader,
    IonToolbar,
    IonContent,
    IonModal,
    IonButtons,
    IonButton,
    IonTitle,
    IonCardTitle,
    IonCard,
    IonCardSubtitle,
    IonCardContent,
  },
  props: {
    notifications: {
      type: Array as PropType<Array<notification>>,
      required: true,
    },
  },
  setup() {
    const localState = reactive({
      notifyModal: false as boolean,
      selectedNotify: {} as notification,
    });

    const openModal = (notify: notification) => {
      localState.selectedNotify = notify;
      localState.notifyModal = false;
      nextTick(() => {
        localState.notifyModal = true;
      });
    };

    return { ...toRefs(localState), openModal };
  },
});
</script>

<style scoped lang="scss">
.notifications {
  &__card {
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 15px;
    background: rgba(10, 25, 56, 0.05);
    box-shadow: none;
  }
  &__title {
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    margin-top: 8px;
    margin-bottom: 3px;
  }
  &__date {
    font-weight: 400;
    font-size: 8px;
    line-height: 10px;
    color: #61c000;
  }
  ion-card-content {
    padding: 0;
  }
}
</style>
