<template>
  <ion-page class="register-page">
    <go-back />
    <div class="register-page__content">
      <ion-content :fullscreen="true">
        <v-form @submit="handleRegister" class="register-page__form">
          <div class="register-page__title">Регистрация</div>
          <ion-item class="register-page__item">
            <ion-label position="floating">
              Имя: <span class="required-star">*</span>
            </ion-label>
            <ion-input
              v-if="form.first_name"
              v-model="form.first_name"
              id="name"
              placeholder="Самандар"
              required
            >
            </ion-input>
            <v-field
              v-else
              name="first_name"
              v-slot="{ field }"
              :rules="isRequired"
            >
              <ion-input v-bind="field"></ion-input>
            </v-field>
            <v-error-message name="first_name" class="error" />
          </ion-item>
          <ion-item class="register-page__item">
            <ion-label position="floating">
              Фамилия: <span class="required-star">*</span>
            </ion-label>
            <ion-input
              v-if="form.last_name"
              v-model="form.last_name"
              id="lasName"
              required
              placeholder="Ибрагимов"
            >
            </ion-input>
            <v-field
              v-else
              name="last_name"
              v-slot="{ field }"
              :rules="[isRequired]"
            >
              <ion-input v-bind="field"></ion-input>
            </v-field>
            <v-error-message name="last_name" class="error" />
          </ion-item>
          <ion-item class="register-page__item">
            <ion-icon
              slot="end"
              color="tertiary"
              :icon="calendarSharp"
            ></ion-icon>
            <ion-label position="floating"> Дата рожения: </ion-label>
            <ion-input
              v-if="form.birth_date"
              v-model="form.birth_date"
              @click="isOpenPopover = true"
              id="open-date-input"
            >
              <ion-popover
                :is-open="isOpenPopover"
                trigger="open-date-input"
                size="cover"
                :show-backdrop="false"
              >
                <ion-datetime
                  presentation="date"
                  color="primary"
                  :value="form.birth_date"
                  @ionChange="setDate"
                />
              </ion-popover>
            </ion-input>
            <v-field
              v-else
              name="birth_date"
              v-slot="{ field }"
              :rules="isRequired"
            >
              <ion-input
                v-bind="field"
                :value="form.birth_date"
                @click="isOpenPopover = true"
                outline
                id="open-date-input"
                color="primary"
              >
                <ion-popover
                  :is-open="isOpenPopover"
                  trigger="open-date-input"
                  size="cover"
                  :show-backdrop="false"
                >
                  <ion-datetime
                    presentation="date"
                    :value="form.birth_date"
                    color="primary"
                    @ionChange="setDate"
                  />
                </ion-popover>
              </ion-input>
            </v-field>
            <v-error-message name="birth_date" class="error" />
          </ion-item>
          <ion-radio-group v-model="form.gender">
            <ion-list-header>
              <ion-label>Пол</ion-label>
            </ion-list-header>
            <div class="register-page__radio-group">
              <ion-item class="radio register-page__radio">
                <ion-label>Муж.</ion-label>
                <ion-radio
                  slot="start"
                  color="primary"
                  value="male"
                ></ion-radio>
              </ion-item>

              <ion-item class="radio register-page__radio">
                <ion-label>Жен.</ion-label>
                <ion-radio
                  slot="start"
                  color="primary"
                  value="female"
                ></ion-radio>
              </ion-item>
            </div>
          </ion-radio-group>
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
              E-mail: <span class="required-star">*</span>
            </ion-label>
            <ion-input
              v-if="form.email"
              v-model="form.email"
              id="email"
              type="email"
              required
              placeholder="name@mail.uz"
            >
            </ion-input>
            <v-field
              v-else
              name="email"
              v-slot="{ field }"
              :rules="[isRequired, emailValidate]"
            >
              <ion-input v-bind="field" type="email"></ion-input>
            </v-field>
            <v-error-message name="email" class="error" />
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
          <ion-item class="register-page__policy">
            <ion-text>
              Согласен с <a href="#">Политикой конфиденциальности</a>
            </ion-text>
            <ion-checkbox
              v-model="form.privacy_accept"
              color="tertiary"
              slot="start"
            ></ion-checkbox>
          </ion-item>
          <div class="register-page__actions">
            <ion-button
              class="register-page__btn"
              type="submit"
              size="default"
              :disabled="!form.privacy_accept"
            >
              Зарегистрироваться
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
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonPopover,
  IonIcon,
  IonCheckbox,
  IonText,
  IonRadioGroup,
  IonRadio,
  IonListHeader,
  IonContent,
  loadingController,
  toastController,
} from "@ionic/vue";

import { calendarSharp } from "ionicons/icons";

import { defineComponent, nextTick, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

import * as V from "vee-validate";
import { mask } from "@thedoctor0/vue-input-mask";

import { registerForm } from "@/models/auth.models";
import { isRequired, emailValidate } from "@/utils/validators";
import { useStore } from "vuex";
import { registerInterface } from "@/interfaces/auth.interface";

export default defineComponent({
  name: "RegisterPage",
  components: {
    IonPage,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonDatetime,
    IonPopover,
    IonIcon,
    IonCheckbox,
    IonText,
    IonRadioGroup,
    IonRadio,
    IonListHeader,
    IonContent,
    VField: V.Field,
    VForm: V.Form,
    VErrorMessage: V.ErrorMessage,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const localState = reactive({
      form: registerForm,
      isOpenPopover: false,
    });

    const handleRegister = async (data: registerInterface) => {
      const requestData = { ...localState.form, ...data };
      requestData.phone = `+${requestData.phone.replaceAll("-", "")}`;
      const loading = await loadingController.create({});
      await loading.present();
      await store
        .dispatch("auth/signup", requestData)
        .then(() => {
          router.push("/");
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

    const setDate = (ev: { detail: { value: string } }) => {
      const formattedDate = new Date(ev.detail.value)
        .toISOString()
        .substring(0, 10);
      nextTick(() => {
        localState.isOpenPopover = false;
        localState.form.birth_date = formattedDate;
      });
    };

    const phoneHandler = (e: any): any => {
      setTimeout(() => {
        const masked = mask(e.target.value, "998-##-###-##-##");
        e.target.value = masked.substring(0, 16);
      }, 250);
    };

    const icons = { calendarSharp };

    return {
      ...toRefs(localState),
      router,
      handleRegister,
      isRequired,
      emailValidate,
      setDate,
      phoneHandler,
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
