<template>
  <Teleport v-if="hasMenu" to="ion-app">
    <ion-menu content-id="main-content" ref="menu">
      <ion-content class="app-menu">
        <user-component class="app-menu__user" />
        <!--        <div class="app-menu__progress">-->
        <!--          <span> Уровень 4 </span>-->
        <!--          <span class="app-menu__points"> 700 YC </span>-->
        <!--        </div>-->
        <!--        <ion-button-->
        <!--          class="app-menu__bonus bonus"-->
        <!--          color="success-2"-->
        <!--          size="small"-->
        <!--          expand="block"-->
        <!--        >-->
        <!--          <span slot="start" style="margin-right: 10px"-->
        <!--            >Заполните профиль полностью</span-->
        <!--          >-->
        <!--          <span slot="end" style="margin-left: auto"> +100YC </span>-->
        <!--        </ion-button>-->
        <div class="app-menu__list">
          <ion-button fill="clear" color="dark">
            <ion-icon
              :icon="settingsOutline"
              slot="start"
              style="margin-right: 15px"
            ></ion-icon>
            Настройки
          </ion-button>
          <ion-button
            fill="clear"
            color="dark"
            @click="openPage('/tabs/events-history')"
          >
            <ion-icon
              :icon="timeOutline"
              slot="start"
              style="margin-right: 15px"
            ></ion-icon>
            История событий
          </ion-button>
          <ion-button fill="clear" color="dark">
            <ion-icon
              :icon="helpCircleOutline"
              slot="start"
              style="margin-right: 15px"
            ></ion-icon>
            Часто задаваемые вопросы
          </ion-button>
          <ion-button fill="clear" color="dark">
            <ion-icon
              :icon="shareSocialOutline"
              slot="start"
              style="margin-right: 15px"
            ></ion-icon>
            Поделиться
          </ion-button>
        </div>
        <div class="app-menu__footer">
          <div class="app-menu__log-out">
            <ion-icon @click="logOutHandler" :icon="logOutOutline" />
          </div>
          <div class="app-menu__copyright">
            <div class="app-menu__logo">Ziyoapp by <logo-forum /></div>
            <div class="app-menu__version">Версия 1.1.0</div>
          </div>
        </div>
      </ion-content>
    </ion-menu>
  </Teleport>
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
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useUserCompositions } from "@/compositions/useUserCompositions";

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

import {
  search,
  notificationsOutline,
  shareSocialOutline,
  settingsOutline,
  helpCircleOutline,
  timeOutline,
  logOutOutline,
} from "ionicons/icons";

import LogoIcon from "@/assets/svg/Logo.vue";
import LogoForum from "@/assets/svg/LogoForum.vue";

import UserComponent from "@/components/UserComponent.vue";
import { useRouter } from "vue-router";

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
    LogoForum,
    IonHeader,
    IonMenu,
    IonTitle,
    IonContent,
    UserComponent,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const userComposition = useUserCompositions();

    const menu = ref(null);

    const user = computed(() => {
      return store.getters["userModule/getUser"];
    });

    const openPage = (url: string) => {
      router.push(url).then(() => {
        // @ts-ignore
        menu.value.$el.close();
      });
    };

    return {
      openPage,
      search,
      notificationsOutline,
      shareSocialOutline,
      settingsOutline,
      helpCircleOutline,
      timeOutline,
      logOutOutline,
      user,
      menu,
      logOutHandler: userComposition.logOut,
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

.app-menu {
  --padding-top: 20px;
  --padding-bottom: 90px;
  --padding-start: 15px;
  --padding-end: 15px;

  &__progress {
    background: #ecffd8;
    border-radius: 10px;
    height: 35px;
    padding: 0 11px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #0a1938;
    margin-bottom: 16px;
  }

  &__points {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #46bb0c;
  }

  ion-button.bonus {
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    color: #ffffff;
    height: 26px;
    align-items: center;
    --padding-top: 7px;
    --padding-end: 10px;
    --padding-bottom: 7px;
    --padding-start: 10px;
    --border-radius: 10px;

    margin-bottom: 38px;
  }

  &__list {
    ion-button {
      text-transform: capitalize;
      --padding-start: 6px;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #001a35;
      margin-bottom: 38px;
      //height: 17px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: auto;
    right: 15px;
    bottom: 30px;
    left: 15px;
  }

  &__logo {
    display: flex;
    align-items: center;
    margin-bottom: 13px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(0, 26, 53, 0.5);

    svg {
      margin-left: 5px;
    }
  }

  &__version {
    font-weight: 300;
    font-size: 10px;
    line-height: 12px;
    color: rgba(0, 26, 53, 0.5);
    text-align: right;
  }
}
</style>
