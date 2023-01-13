<template>
  <ion-page class="register-page">
    <go-back />
    <div class="register-page__content">
      <ion-content :fullscreen="true">
        <v-form
          ref="formRef"
          @submit="handleRegister"
          class="register-page__form"
        >
          <div class="register-page__title">Регистрация</div>
          <ion-item class="register-page__item">
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
          <ion-item class="register-page__item">
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
              :rules="isRequired"
            >
              <ion-input v-bind="field" type="password"></ion-input>
            </v-field>
            <v-error-message name="password" class="error" />
          </ion-item>
          <ion-item class="register-page__item">
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
          <ion-item v-if="form.phone" class="register-page__item">
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
          <div class="register-page__actions">
            <ion-button class="register-page__btn" type="submit" size="default">
              {{ form.phone ? "Зарегистрироваться" : "Получить код" }}
            </ion-button>
          </div>
        </v-form>
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonContent,
  loadingController,
  toastController,
} from "@ionic/vue";

import { calendarSharp } from "ionicons/icons";

import { defineComponent, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";

import * as V from "vee-validate";

import { registerForm } from "@/models/auth.models";
import { isRequired } from "@/utils/validators";
import { useStore } from "vuex";
import { registerInterface } from "@/interfaces/auth.interface";
import { useUserCompositions } from "@/compositions/useUserCompositions";

export default defineComponent({
  name: "RegisterPage",
  components: {
    IonPage,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonContent,
    VField: V.Field,
    VForm: V.Form,
    VErrorMessage: V.ErrorMessage,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const userComposition = useUserCompositions();

    const formRef = ref(null);

    const localState = reactive({
      form: registerForm,
    });

    const handleRegister = async (data: registerInterface) => {
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
        .dispatch("auth/signup", requestData)
        .then(() => {
          router.push("/tabs/profile");
        })
        .catch(async (err: any) => {
          const toast = await toastController.create({
            color: "danger",
            duration: 2000,
            position: "middle",
            message: err || store.getters["auth/authenticationError"],
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
        .dispatch("auth/getCode", localState.form.phone)
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
            message: err || store.getters["auth/authenticationError"],
          });

          await toast.present();
        })
        .finally(() => {
          loading.dismiss();
        });
    };

    const icons = { calendarSharp };

    return {
      ...toRefs(localState),
      router,
      handleRegister,
      isRequired,
      getCode,
      formRef,
      phoneHandler: userComposition.phoneHandler,
      ...icons,
    };
  },
});
</script>

<style scoped lang="scss">
.register-page {
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
    justify-content: center;
  }
  &__forgot {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #27aae2;
  }
  &__policy {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #666666;
  }
  &__radio-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  &__radio {
    flex: 1 0 50%;
  }
  &__form {
    margin: auto 0;
  }
}
ion-item {
  align-items: center;

  &.register-page__policy,
  &.radio {
    --border-width: 0;
    --border-color: transparent;
  }
}
</style>
