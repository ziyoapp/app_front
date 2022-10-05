<template>
  <div class="news-short">
    <div v-if="loading" class="news-short__title">
      <ion-skeleton-text animated />
    </div>
    <blocks-title
      v-else
      class="news-short__title"
      :type="BLOCK_TYPES_RECORD.news"
      text="Новости"
      link-text="Все новости"
    />
    <div class="news-short__list">
      <template v-if="loading">
        <ion-thumbnail class="news-short__item">
          <ion-skeleton-text />
        </ion-thumbnail>
        <ion-thumbnail class="news-short__item">
          <ion-skeleton-text />
        </ion-thumbnail>
        <ion-thumbnail class="news-short__item">
          <ion-skeleton-text />
        </ion-thumbnail>
      </template>
      <news-card
        v-else
        v-for="(news, index) in list"
        :key="index"
        :news="news"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IonThumbnail, IonSkeletonText } from "@ionic/vue";

import NewsCard from "@/components/NewsCard.vue";
import BlocksTitle from "@/components/BlocksTitle.vue";

import { news as oneNews } from "@/interfaces/news.interface";
import { BLOCK_TYPES_RECORD } from "@/shared/constants";

export default defineComponent({
  name: "NewsList",
  props: {
    list: {
      type: Array as PropType<Array<oneNews>>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    NewsCard,
    BlocksTitle,
    IonThumbnail,
    IonSkeletonText,
  },
  setup() {
    return {
      BLOCK_TYPES_RECORD,
    };
  },
});
</script>

<style lang="scss">
.news-short {
  &__title {
    margin-bottom: 10px;
    padding-right: 25px;
  }
  &__list {
    display: flex;
    align-items: center;
    overflow: auto;
  }
  &__item {
    width: 200px;
    height: 100px;
    margin-right: 10px;
  }
}
</style>
