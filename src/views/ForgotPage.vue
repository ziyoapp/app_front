<template>
  <ion-page class="login-page">
    <go-back />
    <form @submit.prevent="handleLogin" class="login-page__form">
      <div class="login-page__title">Забыли пароль?</div>
      <ion-item class="login-page__item">
        <ion-label position="floating">E-mail</ion-label>
        <ion-input
          :value="form.email"
          id="email"
          required
          placeholder="example@gmail.com"
        >
        </ion-input>
      </ion-item>
      <div class="login-page__actions">
        <ion-button
          class="login-page__btn"
          type="submit"
          size="default"
          :disabled="!isCanLogIn"
        >
          Подтвердить
        </ion-button>
      </div>
    </form>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonItem, IonLabel, IonButton, IonInput } from "@ionic/vue";

import { computed, defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

import { loginForm } from "@/models/auth.models";
// import GoBack from "@/components/GoBack.vue";

export default defineComponent({
  name: "LoginPage",
  components: {
    IonPage,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    // GoBack,
  },
  setup() {
    const router = useRouter();

    const localState = reactive({
      form: loginForm,
    });

    const isCanLogIn = computed(() => {
      return localState.form.phone && localState.form.password;
    });

    const handleLogin = () => {
      //
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
  &__form {
    margin: auto 0;
  }
}
</style>
