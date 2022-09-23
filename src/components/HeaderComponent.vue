<template>
  <ion-menu v-if="hasMenu" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu Content</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">This is the menu content.</ion-content>
  </ion-menu>
  <ion-header class="app-header" id="main-content">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button v-if="hasMenu" auto-hide="false"></ion-menu-button>
        <ion-back-button v-else class="app-header__btn"></ion-back-button>
      </ion-buttons>
      <ion-buttons slot="primary">
        <ion-button v-if="hasSearch" shape="round">
          <ion-icon :icon="search"></ion-icon>
        </ion-button>
        <ion-button v-if="hasNotify" shape="round">
          <ion-icon :icon="notificationsOutline"></ion-icon>
        </ion-button>
        <ion-button v-if="hasShare" shape="round">
          <ion-icon :icon="shareSocialOutline"></ion-icon>
        </ion-button>
      </ion-buttons>

      <ion-title v-if="hasTitle" class="app-header__title">
        {{ title }}
      </ion-title>

      <div v-if="hasLogo" class="app-header__logo">
        <logo-icon :width="27" :height="20" />
      </div>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import {
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonMenuButton,
  IonHeader,
  IonMenu,
  IonTitle,
  IonContent,
  IonBackButton,
} from "@ionic/vue";
import { defineComponent } from "vue";

import {
  search,
  notificationsOutline,
  shareSocialOutline,
} from "ionicons/icons";

import LogoIcon from "@/assets/svg/Logo.vue";

export default defineComponent({
  name: "HeaderComponent",
  props: {
    hasMenu: {
      type: Boolean,
      default: true,
    },
    hasLogo: {
      type: Boolean,
      default: true,
    },
    hasTitle: {
      type: Boolean,
      default: false,
    },
    hasShare: {
      type: Boolean,
      default: false,
    },
    hasSearch: {
      type: Boolean,
      default: true,
    },
    hasNotify: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  components: {
    IonBackButton,
    IonToolbar,
    IonButton,
    IonButtons,
    IonIcon,
    IonMenuButton,
    LogoIcon,
    IonHeader,
    IonMenu,
    IonTitle,
    IonContent,
  },
  setup() {
    return {
      search,
      notificationsOutline,
      shareSocialOutline,
    };
  },
});
</script>

<style lang="scss">
.app-header {
  margin-bottom: 16px;
  top: -13px;
  &::after {
    display: none;
  }
  &__title {
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }
  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__btn {
    padding-left: 0;
    .button-native {
      padding-left: 0 !important;
      padding-inline-start: 0;
      --padding-start: 0;
    }
  }
  .back-button-has-icon-only {
    padding-left: 0;
    --padding-start: 0;
    -moz-padding-start: 0;
  }
  .buttons-first-slot {
    margin-left: 0 !important;

    .button {
      padding-left: 0 !important;
      padding-inline-start: 0;
      --padding-start: 0;
      justify-content: flex-start;
    }
  }
}
</style>
