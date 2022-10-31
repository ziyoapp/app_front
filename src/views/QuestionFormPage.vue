<template>
  <ion-page class="question-form">
    <app-header
      :has-logo="false"
      :has-menu="false"
      :has-share="true"
      :has-notify="false"
      :has-search="false"
      has-title
      title="Задать вопрос"
    />
    <div class="question-form__content">
      <ion-content>
        <v-form ref="questionForm" @submit="handleSend">
          <ion-item class="question-form__item default" fill="outline">
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
          <ion-item class="question-form__item default" fill="outline">
            <ion-label position="floating">
              Ваш вопрос:
              <span class="required-star">*</span></ion-label
            >
            <ion-textarea
              v-if="form.text"
              v-model="form.text"
              id="text"
              required
              type="text"
            >
            </ion-textarea>
            <v-field v-else name="text" v-slot="{ field }" :rules="isRequired">
              <ion-textarea v-bind="field"></ion-textarea>
            </v-field>
            <v-error-message name="text" class="error" />
          </ion-item>
          <ion-button
            color="success-2"
            class="ion-margin-top _submit-btn"
            expand="block"
            type="submit"
          >
            <span> Отправить </span>
          </ion-button>
        </v-form>
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";

import { useStore } from "vuex";

import { userQuestionForm } from "@/models/user.models";
import { userQuestion } from "@/interfaces/user.interface";

import * as V from "vee-validate";
import { isRequired, emailValidate } from "@/utils/validators";

import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  loadingController,
  toastController,
} from "@ionic/vue";

export default defineComponent({
  name: "QuestionFormPage",
  components: {
    IonContent,
    IonPage,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    VField: V.Field,
    VForm: V.Form,
    VErrorMessage: V.ErrorMessage,
  },
  setup() {
    const store = useStore();

    const localState = reactive({
      form: userQuestionForm,
    });

    const questionForm = ref(null);

    const handleSend = async (data: userQuestion) => {
      const requestData = { ...localState.form, ...data };

      const loading = await loadingController.create({
        message: "Загрузка...",
      });
      await loading.present();

      store
        .dispatch("userModule/sendUserQuestion", requestData)
        .then(async () => {
          const toast = await toastController.create({
            color: "success",
            duration: 2000,
            position: "bottom",
            message: "Вам ответят в ближайшее время",
          });

          await toast.present();
          if (questionForm?.value) {
            // @ts-ignore
            questionForm.value.resetForm();
          }
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
      handleSend,
      questionForm,
      isRequired,
      emailValidate,
    };
  },
});
</script>

<style scoped lang="scss">
.question-form {
  height: 100%;
  &__content {
    height: 100%;
  }
  &__item {
    margin-bottom: 16px;
  }
  ion-item::part(native) {
    --border-radius: 12px !important;
    border-radius: 12px !important;
    align-items: center;
  }
}
</style>
