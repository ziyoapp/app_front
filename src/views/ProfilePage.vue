<template>
  <ion-page class="profile-page">
    <app-header
      :has-logo="false"
      :has-menu="false"
      :has-share="true"
      :has-notify="false"
      :has-search="false"
      has-title
      title="Профиль"
    />
    <div class="profile-page__content">
      <ion-content :fullscreen="true">
        <v-form @submit="handleUpdate" class="profile-page__form">
          <ion-item class="profile-page__item default" fill="outline">
            <ion-label position="floating"
              >Имя: <span class="required-star">*</span></ion-label
            >
            <ion-input
              v-if="form.first_name"
              v-model="form.first_name"
              id="first_name"
              required
              type="text"
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
          <ion-item class="profile-page__item default" fill="outline">
            <ion-label position="floating">
              Фамилия: <span class="required-star">*</span>
            </ion-label>
            <ion-input
              v-if="form.last_name"
              v-model="form.last_name"
              id="last_name"
              name="last_name"
              required
            >
            </ion-input>
            <v-field
              v-else
              name="last_name"
              v-slot="{ field }"
              :rules="isRequired"
            >
              <ion-input v-bind="field"></ion-input>
            </v-field>
            <v-error-message name="last_name" class="error" />
          </ion-item>

          <ion-item class="profile-page__item default" fill="outline">
            <ion-icon slot="end" :icon="calendarSharp"></ion-icon>
            <ion-label position="floating">
              Дата рожения: <span class="required-star">*</span>
            </ion-label>
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
              <ion-label>Пол <span class="required-star">*</span></ion-label>
            </ion-list-header>
            <ion-row class="profile-page__radio-group">
              <ion-col>
                <ion-item class="radio profile-page__radio default _no-border">
                  <ion-label>Муж.</ion-label>
                  <ion-radio
                    slot="start"
                    color="primary"
                    value="male"
                  ></ion-radio>
                </ion-item>
              </ion-col>
              <ion-col>
                <ion-item class="radio profile-page__radio default _no-border">
                  <ion-label>Жен.</ion-label>
                  <ion-radio
                    slot="start"
                    color="primary"
                    value="female"
                  ></ion-radio>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-radio-group>
          <ion-item class="register-page__item default" fill="outline">
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
          <ion-button
            color="success-2"
            class="ion-margin-top _submit-btn"
            expand="block"
            type="submit"
          >
            <span> Заказать </span>
          </ion-button>
        </v-form>
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";

import {
  IonContent,
  IonPage,
  IonItem,
  IonInput,
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
} from "@ionic/vue";

import { calendarSharp } from "ionicons/icons";

import { useStore } from "vuex";
import { updateUserForm } from "@/models/user.models";

import * as V from "vee-validate";
import { isRequired } from "@/utils/validators";
import { updateUser } from "@/interfaces/user.interface";
import { mask } from "@thedoctor0/vue-input-mask";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ProfilePage",
  components: {
    IonPage,
    IonContent,
    IonItem,
    IonInput,
    IonLabel,
    VField: V.Field,
    VForm: V.Form,
    VErrorMessage: V.ErrorMessage,
    IonPopover,
    IonDatetime,
    IonIcon,
    IonRadioGroup,
    IonRadio,
    IonListHeader,
    IonRow,
    IonCol,
    IonButton,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const localState = reactive({
      form: updateUserForm,
      isOpenPopover: false,
    });

    const user = computed(() => {
      return store.getters["userModule/getUser"];
    });

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

    const handleUpdate = async (data: updateUser) => {
      const requestData = { ...localState.form, ...data };
      requestData.phone = `+${requestData.phone.replaceAll("-", "")}`;
      const loading = await loadingController.create({
        message: "Загрузка...",
      });
      await loading.present();

      store
        .dispatch("userModule/saveUser", requestData)
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
            message: err || store.getters["userModule/error"],
          });

          await toast.present();
        })
        .finally(() => {
          loading.dismiss();
        });
    };

    const setDefaultData = () => {
      localState.form.first_name = user.value.first_name;
      localState.form.last_name = user.value.last_name;
      localState.form.gender = user.value.gender;
      localState.form.birth_date = user.value.birth_date;
      localState.form.phone = user.value.phone;
    };

    onMounted(() => {
      if (!user.value?.id) {
        store.dispatch("userModule/fetchUser").then(() => {
          setDefaultData();
        });
      } else {
        setDefaultData();
      }
    });

    watch(
      () => route.path,
      (val) => {
        if (val === "/tabs/profile") {
          setDefaultData();
        }
      }
    );

    return {
      ...toRefs(localState),
      handleUpdate,
      isRequired,
      setDate,
      phoneHandler,
      user,
      calendarSharp,
    };
  },
});
</script>

<style scoped lang="scss">
.profile-page {
  height: 100%;
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
