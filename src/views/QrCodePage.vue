<template>
  <ion-page class="qr-page">
    <app-header
      :has-logo="false"
      :has-menu="false"
      :has-search="false"
      :has-notify="false"
    />
    <div class="qr-page__content">
      <ion-content :fullscreen="true">
        <ion-card>
          <img :src="qrCode" />
        </ion-card>
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { IonPage, IonContent, loadingController, IonCard } from "@ionic/vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "QrCodePage",
  components: {
    IonPage,
    IonContent,
    IonCard,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const qrCode = computed(() => {
      return store.getters["userModule/getCode"];
    });

    const getQrCode = async () => {
      const loading = await loadingController.create({});
      await loading.present();
      store.dispatch("userModule/fetchQrCode").finally(() => {
        loading.dismiss();
      });
    };

    onMounted(() => {
      getQrCode();
    });

    watch(
      () => route.path,
      (val) => {
        if (val === "/tabs/qr-code") {
          getQrCode();
        }
      }
    );

    return { qrCode };
  },
});
</script>

<style scoped lang="scss">
.qr-page {
  height: 100%;
  &__content {
    height: 100%;
  }
  ion-card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    max-width: 300px;
    margin: 0 auto;
  }
}
</style>
