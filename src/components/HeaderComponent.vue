<template>
  <Teleport v-if="hasMenu" to="ion-app">
    <ion-menu content-id="main-content" ref="menu">
      <ion-content class="app-menu" :class="{ _ios: isPlatform('ios') }">
        <user-component
          class="app-menu__user"
          @click="openPage('/tabs/profile')"
        />
        <div class="app-menu__progress">
          <span> Уровень 1 </span>
          <span class="app-menu__points"> {{ bonus }} YC</span>
        </div>
        <div class="app-menu__list">
          <ion-button
            fill="clear"
            color="dark"
            @click="openPage('/tabs/settings')"
          >
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
          <ion-button
            fill="clear"
            color="dark"
            @click="openPage('/tabs/questions')"
          >
            <ion-icon
              :icon="helpCircleOutline"
              slot="start"
              style="margin-right: 15px"
            ></ion-icon>
            Часто задаваемые вопросы
          </ion-button>
          <ion-button fill="clear" color="dark" @click="shareLink">
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
        <ion-back-button
          v-else
          class="app-header__btn"
          text="назад"
        ></ion-back-button>
      </ion-buttons>
      <ion-buttons slot="primary">
        <div v-if="showBonus" class="app-header__bonus-wrap">
          <bonus-icon slot="start" />
          <span class="app-header__bonus">{{ bonus }}</span>
        </div>
        <!--        <ion-button v-if="hasSearch" shape="round">-->
        <!--          <ion-icon :icon="search"></ion-icon>-->
        <!--        </ion-button>-->
        <ion-button v-if="hasNotify" @click="openNotifyPage" shape="round">
          <ion-icon :icon="notificationsOutline"></ion-icon>
        </ion-button>
        <ion-button v-if="hasShare" shape="round" @click="shareLink">
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
  isPlatform,
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
import BonusIcon from "@/assets/svg/bonus.vue";

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
    showBonus: {
      type: Boolean,
      default: false,
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
    BonusIcon,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const userComposition = useUserCompositions();

    const menu = ref(null);

    const user = computed(() => {
      return store.getters["userModule/getUser"];
    });

    const bonus = computed(() => {
      return store.getters["userModule/getBonus"];
    });

    const openPage = (url: string) => {
      router.push(url).then(() => {
        // @ts-ignore
        menu.value.$el.close();
      });
    };

    const openNotifyPage = () => {
      router.push({ name: "Notification", params: { notify: 1 } });
    };

    const logOutHandler = () => {
      userComposition.logOut();
      // @ts-ignore
      menu.value.$el.close();
    };

    return {
      openPage,
      openNotifyPage,
      search,
      notificationsOutline,
      shareSocialOutline,
      settingsOutline,
      helpCircleOutline,
      timeOutline,
      logOutOutline,
      user,
      menu,
      bonus,
      logOutHandler,
      shareLink: userComposition.shareLink,
      isPlatform,
    };
  },
});
</script>

<style lang="scss">
.app-header {
  margin-bottom: -13px;
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
  &__bonus-wrap {
    display: flex;
    align-items: center;
    padding: 10px 9px;
    background: #ecffd8;
    border-radius: 35px;
  }
  &__bonus {
    font-family: MuseoSansCyrl-500, serif;
    font-style: normal;
    font-size: 10px;
    line-height: 12px;
    color: #001a35;
    margin-left: 15px;
  }
}

.app-menu {
  --padding-top: 20px;
  --padding-bottom: 90px;
  --padding-start: 15px;
  --padding-end: 15px;

  &._ios {
    --padding-top: 60px;
  }

  &__progress {
    font-family: MuseoSansCyrl-500, serif;
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
ion-toolbar {
  --padding-end: 0;
  --padding-start: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
