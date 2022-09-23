<template>
  <div class="news-short">
    <blocks-title
      class="news-short__title"
      :type="BLOCK_TYPES_RECORD.news"
      text="Новости"
      link-text="Все новости"
    />
    <div class="news-short__list">
      <news-card v-for="(news, index) in list" :key="index" :news="news" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

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
  },
  components: {
    NewsCard,
    BlocksTitle,
  },
  setup() {
    return {
      BLOCK_TYPES_RECORD,
    };
  },
});
</script>

<style scoped lang="scss">
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
}
</style>
