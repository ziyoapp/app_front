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
          <div class="profile-page__avatar">
            <ion-avatar>
              <img
                v-if="form.avatar"
                width="126"
                height="126"
                :src="form.avatar"
              />
              <img
                v-else
                width="126"
                height="126"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </ion-avatar>
          </div>
          <div class="profile-page__buttons">
            <ion-buttons slot="end">
              <input
                ref="avatarInput"
                type="file"
                accept="image/*"
                lang="ru"
                @change="fileUploaded"
                style="display: none"
              />
              <ion-button @click="openFiles">
                <ion-icon :icon="cloudUpload" />
              </ion-button>
            </ion-buttons>
          </div>
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
                  ref="datetime"
                  v-model="form.birth_date"
                  color="primary"
                  :show-default-buttons="true"
                >
                  <ion-buttons slot="buttons">
                    <ion-button color="primary" @click="isOpenPopover = false">
                      Отмена
                    </ion-button>
                    <ion-button color="primary" @click="confirmDate()">
                      Готово
                    </ion-button>
                  </ion-buttons>
                </ion-datetime>
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
                    ref="datetime"
                    v-model="form.birth_date"
                    color="primary"
                    :show-default-buttons="true"
                  >
                    <ion-buttons slot="buttons">
                      <ion-button
                        color="primary"
                        @click="isOpenPopover = false"
                      >
                        Отмена
                      </ion-button>
                      <ion-button color="primary" @click="confirmDate()">
                        Готово
                      </ion-button>
                    </ion-buttons>
                  </ion-datetime>
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
          <ion-item class="profile-page__item default" fill="outline">
            <ion-label position="stacked">Никнейм: </ion-label>
            <ion-input v-model="form.nickname" id="nickname" type="text">
            </ion-input>
          </ion-item>
          <ion-item class="profile-page__item">
            <ion-label position="floating"> E-mail: </ion-label>
            <ion-input
              v-model="form.email"
              id="email"
              type="email"
              placeholder="name@mail.uz"
            >
            </ion-input>
            <v-error-message name="email" class="error" />
          </ion-item>

          <ion-item class="profile-page__item default" fill="outline">
            <ion-label position="stacked">Доп информация: </ion-label>
            <ion-textarea
              v-model="form.additional_info"
              id="additional_info"
              type="text"
            >
            </ion-textarea>
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
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";

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

import { calendarSharp, cloudUpload, trashOutline } from "ionicons/icons";

import { useStore } from "vuex";
import { useRoute } from "vue-router";

import { updateUserForm } from "@/models/user.models";
import { updateUser } from "@/interfaces/user.interface";

import * as V from "vee-validate";
import { isRequired, emailValidate } from "@/utils/validators";
import { mask } from "@thedoctor0/vue-input-mask";

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
    IonTextarea,
    IonButtons,
    IonAvatar,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const datetime = ref(null);
    const avatarInput = ref(null);

    const localState = reactive({
      form: updateUserForm,
      isOpenPopover: false,
      newAvatar: null as any,
    });

    const user = computed(() => {
      return store.getters["userModule/getUser"];
    });

    const setDate = () => {
      const formattedDate = new Date(localState.form.birth_date)
        .toISOString()
        .substring(0, 10);
      nextTick(() => {
        localState.isOpenPopover = false;
        localState.form.birth_date = formattedDate;
      });
    };

    const removeAvatar = () => {
      localState.form.avatar = "";
    };

    const openFiles = () => {
      // @ts-ignore
      avatarInput.value?.click();
    };

    const fileUploaded = (event: any) => {
      let files: FileList = event.target.files;
      let result: File[] = [];
      for (let i = 0; i < files.length; i++) {
        // @ts-ignore
        result.push(files.item(i));
      }
      const reader = new FileReader();

      reader.onload = () => {
        localState.form.avatar = URL.createObjectURL(result[0]);
        // @ts-ignore
        localState.newAvatar = result[0];
      };

      reader.readAsBinaryString(result[0]);
    };

    const phoneHandler = (e: any): any => {
      setTimeout(() => {
        const masked = mask(e.target.value, "998-##-###-##-##");
        e.target.value = masked.substring(0, 16);
      }, 250);
    };

    const handleUpdate = async (data: updateUser) => {
      const requestData = { ...localState.form, ...data };
      const loading = await loadingController.create({});
      await loading.present();

      if (localState.newAvatar) {
        // @ts-ignore
        requestData.avatar = localState.newAvatar;
      } else {
        delete requestData.avatar;
      }

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
            message: store.getters["userModule/error"] || err,
          });

          await toast.present();
        })
        .finally(() => {
          loading.dismiss();
        });
    };

    const confirmDate = () => {
      // @ts-ignore
      datetime?.value?.$el.confirm(true);
      localState.isOpenPopover = false;
      setDate();
    };

    const setDefaultData = () => {
      localState.form.first_name = user.value.first_name;
      localState.form.last_name = user.value.last_name;
      localState.form.gender = user.value.gender;
      localState.form.birth_date = user.value.birth_date;
      localState.form.nickname = user.value.nickname;
      localState.form.additional_info = user.value.additional_info ?? "";
      localState.form.avatar = user.value.avatar;
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
      emailValidate,
      setDate,
      phoneHandler,
      confirmDate,
      removeAvatar,
      openFiles,
      fileUploaded,
      datetime,
      avatarInput,
      user,
      calendarSharp,
      cloudUpload,
      trashOutline,
    };
  },
});
</script>

<style scoped lang="scss">
.profile-page {
  height: 100%;
  &__avatar {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    min-height: 126px;
    margin-top: 20px;

    img,
    ion-avatar {
      width: 126px;
      height: 126px;
      max-width: 126px;
    }
  }
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
