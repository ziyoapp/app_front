<template>
  <div class="event-card-big">
    <img
      :src="event.image_url || 'https://ziyoforum-app.uz/storage/1/360x260.png'"
      :alt="event.title"
    />
    <div class="event-card-big__title">
      {{ event.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { event as oneEvent } from "@/interfaces/events.interface";

export default defineComponent({
  name: "EventCardBig",
  props: {
    event: {
      type: Object as PropType<oneEvent>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.event-card-big {
  display: flex;
  align-items: flex-end;
  border-radius: 10px;
  color: #fff;
  position: relative;
  overflow: hidden;

  &__title {
    opacity: 0;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    color: #0a1938;
    position: absolute;
    top: auto;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  img {
    border-radius: 10px;
    display: block;
    width: 100%;
    max-width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
