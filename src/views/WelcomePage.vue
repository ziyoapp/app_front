<template>
  <ion-page class="welcome-page">
    <div class="welcome-page__content">
      <ion-content :fullscreen="true">
        <div class="welcome-page__title">Добро пожаловать в Ziyo app!</div>
        <form @submit.prevent="handleLogin" class="welcome-page__form">
          <ion-item class="welcome-page__item" placeholder="+998">
            <ion-label position="floating">Номер телефона</ion-label>
            <ion-input
              v-model.trim="form.phone"
              id="phone"
              type="tel"
              @keyup="phoneHandler"
              required
            >
            </ion-input>
          </ion-item>
          <ion-item class="welcome-page__item">
            <ion-label position="floating">Пароль</ion-label>
            <ion-input
              v-model="form.password"
              type="password"
              id="password"
              required
            ></ion-input>
          </ion-item>
          <div class="welcome-page__actions">
            <div class="welcome-page__forgot" @click="$router.push('/forgot')">
              Забыли пароль?
            </div>
            <ion-button
              class="welcome-page__btn"
              type="submit"
              size="default"
              expand="block"
              color="success-2"
              :disabled="!isCanLogIn"
            >
              Войти
            </ion-button>
            <div class="welcome-page__register">
              Нет аккаунта?
              <span @click="$router.push('/register')">Создайте сейчас.</span>
            </div>
          </div>
        </form>
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import {
  loadingController,
  alertController,
  IonPage,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonContent,
} from "@ionic/vue";

import { computed, defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useUserCompositions } from "@/compositions/useUserCompositions";
import { loginForm } from "@/models/auth.models";

export default defineComponent({
  name: "WelcomePage",
  components: {
    IonPage,
    IonButton,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const userComposition = useUserCompositions();

    const localState = reactive({
      form: loginForm,
    });

    const isCanLogIn = computed(() => {
      return localState.form.phone && localState.form.password;
    });

    const handleLogin = async () => {
      const loading = await loadingController.create({});
      await loading.present();
      localState.form.phone = localState.form.phone.replaceAll("-", "");
      await store
        .dispatch("auth/signIn", localState.form)
        .then(() => {
          router.push("/").then(() => {
            window.location.reload();
          });
        })
        .catch(async (err: any) => {
          const errorAlert = await alertController.create({
            header: "Ошибка!",
            message: err || store.getters["auth/authenticationError"],
            buttons: ["OK"],
          });
          await errorAlert.present();
        })
        .finally(() => {
          loading.dismiss();
        });
    };

    return {
      ...toRefs(localState),
      router,
      isCanLogIn,
      phoneHandler: userComposition.phoneHandler,
      handleLogin,
    };
  },
});
</script>

<style scoped lang="scss">
.welcome-page {
  padding: 0 7px;
  height: 100%;
  &__content {
    height: 100%;
  }
  &__logo {
    margin-bottom: 40px;
    margin-right: auto;
  }
  &__title {
    font-weight: 700;
    font-family: MuseoSansCyrl-700, serif;
    font-size: 32px;
    line-height: 40px;
    color: #333333;
    margin-bottom: 24px;
  }
  &__item {
    margin-bottom: 16px;
    font-family: MuseoSansCyrl-500, serif;
  }
  &__actions {
    margin-top: 16px;
  }
  &__forgot {
    font-style: normal;
    font-family: MuseoSansCyrl-500, serif;
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #46bb0c;
  }
  &__form {
    margin: 30px 0 auto;
    font-family: MuseoSansCyrl-500, serif;
  }
  &__btn {
    --border-radius: 10px;
    margin-bottom: 10px;
  }
  &__register {
    font-family: MuseoSansCyrl-500, serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #0a1938;

    span {
      color: #46bb0c;
    }
  }
}
</style>
