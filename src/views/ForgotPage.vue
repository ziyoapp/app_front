<template>
  <ion-page class="login-page">
    <app-header
      :has-logo="false"
      :has-menu="false"
      :has-share="false"
      :has-notify="false"
      :has-search="false"
      has-title
      title="Восстановить пароль"
    />
    <v-form ref="formRef" @submit="handleReset" class="login-page__form">
      <ion-item class="login-page__item">
        <ion-label position="floating">
          Телефон: <span class="required-star">*</span>
        </ion-label>
        <ion-input
          v-if="form.phone"
          v-model="form.phone"
          id="phone"
          @keyup="phoneHandler"
          type="tel"
          required
          placeholder="+998"
        >
        </ion-input>
        <v-field v-else name="phone" v-slot="{ field }" :rules="isRequired">
          <ion-input
            v-bind="field"
            type="tel"
            @keyup="phoneHandler"
          ></ion-input>
        </v-field>
        <v-error-message name="phone" class="error" />
      </ion-item>
      <ion-item class="login-page__item">
        <ion-label position="floating">
          Пароль: <span class="required-star">*</span>
        </ion-label>
        <ion-input
          v-if="form.password"
          v-model="form.password"
          id="password"
          type="password"
          required
          placeholder="*****"
        >
        </ion-input>
        <v-field
          v-else
          name="password"
          v-slot="{ field }"
          :rules="[isRequired, passwordMinLength]"
        >
          <ion-input v-bind="field" type="password"></ion-input>
        </v-field>
        <v-error-message name="password" class="error" />
      </ion-item>
      <ion-item class="login-page__item">
        <ion-label position="floating">
          Повторите пароль: <span class="required-star">*</span>
        </ion-label>
        <ion-input
          v-if="form.password_confirmation"
          v-model="form.password_confirmation"
          id="repeatPassword"
          type="password"
          required
          placeholder="*****"
        >
        </ion-input>
        <v-field
          v-else
          name="password_confirmation"
          v-slot="{ field }"
          :rules="isRequired"
        >
          <ion-input v-bind="field" type="password"></ion-input>
        </v-field>
        <v-error-message name="password_confirmation" class="error" />
      </ion-item>
      <ion-item v-if="form.phone" class="login-page__item">
        <ion-label position="floating">
          Код: <span class="required-star">*</span>
        </ion-label>
        <ion-input
          v-if="form.code"
          v-model="form.code"
          id="code"
          type="number"
          required
          placeholder="*****"
        >
        </ion-input>
        <v-field v-else name="code" v-slot="{ field }" :rules="isRequired">
          <ion-input v-bind="field" type="number"></ion-input>
        </v-field>
        <v-error-message name="code" class="error" />
      </ion-item>
      <div class="login-page__actions">
        <ion-button
          class="login-page__btn"
          type="submit"
          size="default"
          expand="block"
          color="success-2"
        >
          {{ form.phone ? "Обновить пароль" : "Получить код" }}
        </ion-button>
      </div>
    </v-form>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  toastController,
  loadingController,
} from "@ionic/vue";
import { computed, defineComponent, reactive, toRefs } from "vue";

import { useRouter } from "vue-router";
import { useUserCompositions } from "@/compositions/useUserCompositions";

import { isRequired, passwordMinLength } from "@/utils/validators";
import * as V from "vee-validate";

import { registerInterface } from "@/interfaces/auth.interface";
import { useStore } from "vuex";

export default defineComponent({
  name: "LoginPage",
  components: {
    IonPage,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    VField: V.Field,
    VForm: V.Form,
    VErrorMessage: V.ErrorMessage,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const userComposition = useUserCompositions();

    const localState = reactive({
      form: {} as registerInterface,
    });

    const isCanLogIn = computed(() => {
      return localState.form.phone && localState.form.password;
    });

    const handleReset = async (data: registerInterface) => {
      const requestData = { ...localState.form, ...data };

      requestData.phone = requestData.phone.replaceAll("-", "");
      localState.form.phone = requestData.phone;

      if (!requestData.code) {
        await getCode();
        return;
      }

      const loading = await loadingController.create({});
      await loading.present();
      await store
        .dispatch("userModule/resetPassword", requestData)
        .then(() => {
          router.push("/auth");
        })
        .catch(async (err: any) => {
          const toast = await toastController.create({
            color: "danger",
            duration: 2000,
            position: "middle",
            message: err || store.getters["userModule/error"],
          });

          await toast.present();
        })
        .finally(() => {
          loading.dismiss();
        });
    };

    const getCode = async () => {
      const loading = await loadingController.create({});
      await loading.present();
      await store
        .dispatch("userModule/getResetCode", localState.form.phone)
        .then(async () => {
          const toast = await toastController.create({
            color: "success",
            duration: 2000,
            position: "middle",
            message: "Код отправен на указанный номер",
          });

          await toast.present();
        })
        .catch(async (err: any) => {
          const toast = await toastController.create({
            color: "danger",
            duration: 2000,
            position: "middle",
            message: err || store.getters["userModule/error"],
          });

          await toast.present();
        })
        .finally(() => {
          loading.dismiss();
        });
    };

    return {
      ...toRefs(localState),
      router,
      isCanLogIn,
      handleReset,
      isRequired,
      passwordMinLength,
      phoneHandler: userComposition.phoneHandler,
    };
  },
});
</script>

<style scoped lang="scss">
.login-page {
  padding: 0 7px;
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
  &__form {
    margin-bottom: auto;
  }
  &__actions {
    margin-top: 22px;
  }
  &__btn {
    --border-radius: 10px;
    margin-bottom: 10px;
  }
}
</style>
