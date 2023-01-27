<template>
  <div class="news-card">
    <div class="news-card__title">
      {{ news.title }}
    </div>
    <div class="news-card__desc">
      {{ news.description }}
    </div>
    <div class="news-card__date">
      {{ dateFormat(news.published_at) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { news as oneNews } from "@/interfaces/news.interface";
import { useUserCompositions } from "@/compositions/useUserCompositions";

export default defineComponent({
  name: "NewsCard",
  props: {
    news: {
      type: Object as PropType<oneNews>,
      required: true,
    },
  },
  setup() {
    const userComposition = useUserCompositions();

    return {
      dateFormat: userComposition.formatFn,
    };
  },
});
</script>

<style scoped lang="scss">
.news-card {
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
  border-radius: 10px;
  margin-right: 8px;
  flex: 1 0 95%;
  max-width: 500px;
  padding: 10px;
  height: 100px;

  &__title {
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 16px;
    margin-bottom: 5px;
  }

  &__desc {
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 14px;
    margin-bottom: 9px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
  }

  &__date {
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 14px;
    margin-top: auto;
    /* identical to box height */

    color: #61c000;
  }
}
</style>
