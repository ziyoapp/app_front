<template>
  <ion-page class="news-detail">
    <app-header
      :has-logo="false"
      :has-menu="false"
      :has-share="true"
      :has-notify="false"
      :has-search="false"
    />
    <div class="news-detail__content">
      <ion-content :fullscreen="true">
        <div class="news-detail__img">
          <ion-thumbnail
            v-if="loadingStatus"
            style="width: 100%; height: 260px"
          >
            <ion-skeleton-text :animated="true"></ion-skeleton-text>
          </ion-thumbnail>
          <img v-else :src="news.image_url" :alt="news.title" />
        </div>
        <div class="news-detail__inner">
          <ion-skeleton-text
            v-if="loadingStatus"
            :animated="true"
            class="news-detail__title"
          />
          <div v-else class="news-detail__title">
            {{ news.title }}
          </div>
          <ion-skeleton-text
            v-if="loadingStatus"
            :animated="true"
            class="news-detail__date"
          />
          <div v-else class="news-detail__date">
            {{ news.published_at }}
          </div>
          <div v-if="loadingStatus">
            <ion-skeleton-text :animated="true" class="news-detail__desc" />
            <ion-skeleton-text :animated="true" class="news-detail__desc" />
            <ion-skeleton-text :animated="true" class="news-detail__desc" />
            <ion-skeleton-text :animated="true" class="news-detail__desc" />
          </div>
          <div v-else class="news-detail__desc" v-html="news.content"></div>
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
  name: "NewsDetail",
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

    const news = computed(() => {
      return store.getters["news/getOne"];
    });

    const getOneNews = async () => {
      loadingStatus.value = true;
      const loading = await loadingController.create({});
      await loading.present();

      await store
        .dispatch("news/fetchOne", route.params.news_id)
        .finally(() => {
          loading.dismiss();
          loadingStatus.value = false;
        });
    };

    onMounted(() => {
      getOneNews();
    });

    return {
      news,
      loadingStatus,
    };
  },
});
</script>

<style scoped lang="scss">
.news-detail {
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
  &__date {
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    color: #61c000;
    margin-bottom: 13px;
  }
  &__desc {
    font-weight: 700;
    font-size: 10px;
    line-height: 12px;
    color: #0a1938;
  }
}
</style>
