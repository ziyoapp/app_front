<template>
  <div class="events-short">
    <blocks-title
      class="events-short__title"
      :type="BLOCK_TYPES_RECORD.events"
      text="Последние события"
    />
    <div class="events-short__list">
      <event-card v-for="(item, index) in list" :key="index" :event="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { event as oneEvent } from "@/interfaces/events.interface";

import BlocksTitle from "@/components/BlocksTitle.vue";
import EventCard from "@/components/EventCard.vue";
import { BLOCK_TYPES_RECORD } from "@/shared/constants";

export default defineComponent({
  name: "EventsList",
  props: {
    list: {
      type: Array as PropType<Array<oneEvent>>,
      required: true,
    },
  },
  components: {
    BlocksTitle,
    EventCard,
  },
  setup() {
    return {
      BLOCK_TYPES_RECORD,
    };
  },
});
</script>

<style scoped lang="scss">
.events-short {
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
