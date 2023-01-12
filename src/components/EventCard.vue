<template>
  <div class="event-card">
    <div
      class="event-card__img"
      @click="$router.push(`/tabs/event/${event.id}`)"
    >
      <img
        :src="
          event.image_url || 'https://ziyoforum-app.uz/storage/1/360x260.png'
        "
        :alt="event.title"
      />
    </div>
    <div class="event-card__content">
      <div
        class="event-card__title"
        @click="$router.push(`/tabs/event/${event.id}`)"
      >
        {{ event.title }}
      </div>
      <div class="event-card__desc">
        {{ event.description }}
      </div>
      <div class="event-card__date">
        {{ dateFormat(event.published_at) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { event as oneEvent } from "@/interfaces/events.interface";
import { useUserCompositions } from "@/compositions/useUserCompositions";

export default defineComponent({
  name: "EventCard",
  props: {
    event: {
      type: Object as PropType<oneEvent>,
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
.event-card {
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #0a1938 0%, #244894 100%);
  border-radius: 10px;
  margin-right: 8px;
  flex: 1 0 95%;
  max-width: 500px;
  padding: 10px;
  height: 120px;
  overflow: hidden;
  color: #fff;

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 8px;
  }

  &__desc {
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 10px;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
  }

  &__date {
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    margin-top: auto;
    /* identical to box height */

    color: #61c000;
  }

  &__img {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    flex: 1 0 141px;
    height: 116px;

    img {
      width: 100%;
      max-width: 100%;
      max-height: 100%;
      height: auto;
      object-fit: contain;
    }
  }
}
</style>
