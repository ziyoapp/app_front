<template>
  <div class="blocks-title">
    <div class="blocks-title__text">
      {{ text }}
    </div>
    <div class="blocks-title__link">
      <ion-button
        v-if="type === BLOCK_TYPES_RECORD.events"
        fill="clear"
        to="/tabs/events"
        router-link="/tabs/events"
      >
        {{ linkText }}
      </ion-button>
      <ion-nav-link v-else router-direction="forward" :component="component">
        {{ linkText }}
      </ion-nav-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { BLOCK_TYPES, BLOCK_TYPES_RECORD } from "@/shared/constants";

import { IonNavLink, IonItem, IonLabel, IonButton } from "@ionic/vue";
import NewsPage from "@/views/news/index.vue";
import NotFoundPage from "@/views/404.vue";

export default defineComponent({
  name: "BlocksTitle",
  props: {
    text: {
      type: String,
      required: true,
    },
    linkText: {
      type: String,
      default: "смотреть все",
    },
    type: {
      type: String,
      required: true,
    },
  },
  components: { IonNavLink, IonButton },
  setup(props) {
    const component = computed(() => {
      if (!BLOCK_TYPES.includes(props.type)) {
        return NotFoundPage;
      }
      if (props.type === BLOCK_TYPES_RECORD.news) return NewsPage;

      return NotFoundPage;
    });

    return {
      BLOCK_TYPES,
      BLOCK_TYPES_RECORD,
      component,
    };
  },
});
</script>

<style scoped lang="scss">
.blocks-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__text {
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 13px;
    color: #000000;
  }
  &__link,
  &__link button,
  &__link ion-button {
    font-weight: 600;
    font-size: 10px;
    line-height: 13px;
    text-align: right;
    color: #46bb0c;
    text-transform: none;
  }
}
</style>
