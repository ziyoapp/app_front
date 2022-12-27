<template>
  <ion-page class="login-page">
    <go-back />
    <div class="login-page__content">
      <ion-content :fullscreen="true">
        <form @submit.prevent="handleLogin" class="login-page__form">
          <div class="login-page__title">Войти</div>
          <ion-item class="login-page__item">
            <ion-label position="floating">E-mail</ion-label>
            <ion-input
              v-model.trim="form.email"
              id="email"
              required
              type="email"
              placeholder="example@gmail.com"
            >
            </ion-input>
          </ion-item>
          <ion-item class="login-page__item">
            <ion-label position="floating">Пароль</ion-label>
            <ion-input
              v-model="form.password"
              type="password"
              id="password"
              required
            ></ion-input>
          </ion-item>
          <div class="login-page__actions">
            <ion-button
              class="login-page__btn"
              type="submit"
              size="default"
              :disabled="!isCanLogIn"
            >
              Войти
            </ion-button>
            <span class="login-page__forgot" @click="$router.push('/forgot')"
              >Забыли пароль?</span
            >
          </div>
        </form>
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  loadingController,
  alertController,
  IonContent,
} from "@ionic/vue";

import { computed, defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

import { loginForm } from "@/models/auth.models";
import { useStore } from "vuex";

export default defineComponent({
  name: "LoginPage",
  components: {
    IonPage,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonContent,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const localState = reactive({
      form: loginForm,
    });

    const isCanLogIn = computed(() => {
      return localState.form.email && localState.form.password;
    });

    const handleLogin = async () => {
      const loading = await loadingController.create({});
      await loading.present();
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
      handleLogin,
    };
  },
});
</script>

<style scoped lang="scss">
.login-page {
  padding: 0;
  height: 100%;
  &__content {
    height: 100%;
  }
  &__title {
    font-family: "Inter", serif;
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 44px;
    color: #333;
    margin-bottom: 24px;
  }
  &__item {
    margin-bottom: 16px;
  }
  &__actions {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__forgot {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #27aae2;
  }
  &__form {
    margin: 30px 0 auto;
  }
}
</style>
