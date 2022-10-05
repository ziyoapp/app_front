<template>
  <ion-page class="event-detail">
    <app-header
      :has-logo="false"
      :has-menu="false"
      :has-share="true"
      :has-notify="false"
      :has-search="false"
    />
    <div class="event-detail__content">
      <ion-content :fullscreen="true">
        <div class="event-detail__img">
          <ion-thumbnail
            v-if="loadingStatus"
            style="width: 100%; height: 260px"
          >
            <ion-skeleton-text :animated="true"></ion-skeleton-text>
          </ion-thumbnail>
          <img v-else :src="imgSrc" :alt="event.title" />
        </div>
        <div class="event-detail__inner">
          <ion-skeleton-text
            v-if="loadingStatus"
            :animated="true"
            class="event-detail__title"
          />
          <div v-else class="event-detail__title">
            {{ event.title }}
          </div>
          <div v-if="loadingStatus">
            <ion-skeleton-text :animated="true" class="event-detail__desc" />
            <ion-skeleton-text :animated="true" class="event-detail__desc" />
            <ion-skeleton-text :animated="true" class="event-detail__desc" />
            <ion-skeleton-text :animated="true" class="event-detail__desc" />
          </div>
          <div v-else class="event-detail__desc" v-html="event.content"></div>
        </div>
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import {
  IonPage,
  IonContent,
  loadingController,
  IonSkeletonText,
  IonThumbnail,
} from "@ionic/vue";

export default defineComponent({
  name: "EventDetail",
  components: {
    IonContent,
    IonPage,
    IonSkeletonText,
    IonThumbnail,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const loadingStatus = ref(false);

    const event = computed(() => {
      return store.getters["events/getOne"];
    });

    const getOneEvent = async () => {
      loadingStatus.value = true;
      const loading = await loadingController.create({
        message: "Загрузка...",
      });
      await loading.present();

      await store
        .dispatch("events/fetchOne", route.params.event_id)
        .finally(() => {
          loading.dismiss();
          loadingStatus.value = false;
        });
    };

    const imgSrc = computed(() => {
      return (
        event.value.image_url ||
        "https://ionicframework.com/docs/img/demos/thumbnail.svg"
      );
    });

    onMounted(() => {
      getOneEvent();
    });

    return {
      event,
      imgSrc,
      loadingStatus,
    };
  },
});
</script>

<style scoped lang="scss">
.event-detail {
  height: 100%;
  padding-left: 0;
  padding-right: 0;
  &__content {
    height: 100%;
  }
  &__img {
    width: 100%;
    max-height: 260px;
    margin-bottom: 10px;
    overflow: hidden;
    img {
      width: 100%;
      display: block;
      object-fit: cover;
      max-height: 260px;
    }
  }
  &__inner {
    padding-left: 15px;
    padding-right: 15px;
  }
  &__title {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #0a1938;
    margin-bottom: 10px;
  }
  &__desc {
    font-weight: 700;
    font-size: 10px;
    line-height: 12px;
    color: #0a1938;
  }
}
</style>
