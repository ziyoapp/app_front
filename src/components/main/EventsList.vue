<template>
  <div class="events-short">
    <div v-if="loading" class="events-short__title">
      <ion-skeleton-text animated />
    </div>
    <blocks-title
      v-else
      class="events-short__title"
      :type="BLOCK_TYPES_RECORD.events"
      text="Последние события"
    />
    <div class="events-short__list">
      <template v-if="loading">
        <ion-thumbnail class="events-short__item">
          <ion-skeleton-text />
        </ion-thumbnail>
        <ion-thumbnail class="events-short__item">
          <ion-skeleton-text />
        </ion-thumbnail>
        <ion-thumbnail class="events-short__item">
          <ion-skeleton-text />
        </ion-thumbnail>
      </template>
      <event-card
        v-else
        v-for="(item, index) in list"
        :key="index"
        :event="item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IonThumbnail, IonSkeletonText } from "@ionic/vue";
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BlocksTitle,
    EventCard,
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
  &__item {
    width: 200px;
    height: 100px;
    margin-right: 10px;
  }
}
</style>
