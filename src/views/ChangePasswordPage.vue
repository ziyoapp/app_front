<template>
  <ion-page class="password-page">
    <app-header
      :has-logo="false"
      :has-menu="false"
      :has-share="true"
      :has-notify="false"
      :has-search="false"
      has-title
      title="Безопасность"
    />
    <div class="password-page__content">
      <ion-content :fullscreen="true">
        <v-form @submit="handleUpdate" class="password-page__form">
          <ion-item class="password-page__item default" fill="outline">
            <ion-label position="floating"
              >Текущий пароль: <span class="required-star">*</span></ion-label
            >
            <ion-input
              v-if="form.current_password"
              v-model="form.current_password"
              id="current_password"
              required
              type="password"
            >
            </ion-input>
            <v-field
              v-else
              name="current_password"
              v-slot="{ field }"
              :rules="isRequired"
            >
              <ion-input v-bind="field" type="password"></ion-input>
            </v-field>
            <v-error-message name="current_password" class="error" />
          </ion-item>
          <ion-item class="password-page__item default" fill="outline">
            <ion-label position="floating"
              >Новый пароль: <span class="required-star">*</span></ion-label
            >
            <ion-input
              v-if="form.new_password"
              v-model="form.new_password"
              id="new_password"
              required
              type="password"
            >
            </ion-input>
            <v-field
              v-else
              name="new_password"
              v-slot="{ field }"
              :rules="isRequired"
            >
              <ion-input v-bind="field" type="password"></ion-input>
            </v-field>
            <v-error-message name="new_password" class="error" />
          </ion-item>
          <ion-item class="password-page__item default" fill="outline">
            <ion-label position="floating"
              >Повторите новый пароль:
              <span class="required-star">*</span></ion-label
            >
            <ion-input
              v-if="form.new_password_confirmation"
              v-model="form.new_password_confirmation"
              id="new_password_confirmation"
              required
              type="password"
            >
            </ion-input>
            <v-field
              v-else
              name="new_password_confirmation"
              v-slot="{ field }"
              :rules="isRequired"
            >
              <ion-input v-bind="field" type="password"></ion-input>
            </v-field>
            <v-error-message name="new_password_confirmation" class="error" />
          </ion-item>
          <ion-button
            color="success-2"
            class="ion-margin-top _submit-btn"
            expand="block"
            type="submit"
          >
            <span> Сохранить </span>
          </ion-button>
        </v-form>
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

import * as V from "vee-validate";
import { isRequired } from "@/utils/validators";

import {
  IonContent,
  IonPage,
  IonItem,
  IonInput,
  IonTextarea,
  IonLabel,
  loadingController,
  toastController,
  IonPopover,
  IonDatetime,
  IonIcon,
  IonRadioGroup,
  IonRadio,
  IonListHeader,
  IonRow,
  IonCol,
  IonButton,
  IonButtons,
  IonAvatar,
} from "@ionic/vue";

import { useStore } from "vuex";
import { changePassword } from "@/interfaces/user.interface";

export default defineComponent({
  name: "ChangePasswordPage",
  components: {
    IonPage,
    IonContent,
    VField: V.Field,
    VForm: V.Form,
    VErrorMessage: V.ErrorMessage,
  },
  setup() {
    const store = useStore();

    const localState = reactive({
      form: {} as changePassword,
    });

    const handleUpdate = async (data: changePassword) => {
      const requestData = { ...localState.form, ...data };
      const loading = await loadingController.create({});
      await loading.present();

      store
        .dispatch("userModule/savePassword", requestData)
        .then(async () => {
          const toast = await toastController.create({
            color: "success",
            duration: 2000,
            position: "bottom",
            message: "Данные сохранены",
          });

          await toast.present();
        })
        .catch(async (err: any) => {
          const toast = await toastController.create({
            color: "danger",
            duration: 2000,
            position: "middle",
            message: store.getters["userModule/error"] || err,
          });

          await toast.present();
        })
        .finally(() => {
          loading.dismiss();
        });
    };

    return { ...toRefs(localState), handleUpdate, isRequired };
  },
});
</script>

<style scoped lang="scss">
.password-page {
  height: 100%;
  &__buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  &__content {
    height: 100%;
  }
  &__item {
    margin-bottom: 18px;
  }
  ion-item::part(native) {
    --border-radius: 10px !important;
    border-radius: 10px !important;
    align-items: center;
  }
  ion-radio {
    margin-inline-end: 9px;
  }
}
</style>
